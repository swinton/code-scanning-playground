const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github').getOctokit(process.env.GITHUB_TOKEN);

annotationLevelFromResultLevel = (resultLevel) => {
  const resultLevelMap = {
    'error': 'failure',
    'warning': 'warning',
    'note': 'notice',
  }
  return resultLevelMap[resultLevel];
};

pathRelativeToGitHubWorkspace = (absolutePath) => {
  const fileProtocolRegexp = /^file:\/\//i;
  const leadingSlashRegexp = /^\//;
  return absolutePath
    .replace(fileProtocolRegexp, '')
    .replace(process.env.GITHUB_WORKSPACE, '')
    .replace(leadingSlashRegexp, '');
}

async function main () {
  try {
    const [ owner, repo ] = process.env.GITHUB_REPOSITORY.split('/');

    // Load SARIF
    const sarifPath = core.getInput('sarif_file');
    const data = require(path.join(process.env.GITHUB_WORKSPACE, sarifPath));
    core.info(`sarifPath: ${ sarifPath }`);

    // Process SARIF
    const results = data.runs[0].results;
    const name = data.runs[0].tool.driver.name;

    const annotations = await Promise.all(results.map(async result => {
      const location = result.locations[0].physicalLocation;

      return {
        path: pathRelativeToGitHubWorkspace(location.artifactLocation.uri),
        start_line: location.region.startLine,
        end_line: location.region.endLine || location.region.startLine,
        start_column: location.region.startColumn,
        end_column: location.region.endColumn || location.region.startColumn,
        annotation_level: annotationLevelFromResultLevel(result.level),  // Can be one of notice, warning, or failure
        message: result.message.text,
        title: result.ruleId,
      }
    }));

    // https://docs.github.com/en/free-pro-team@latest/rest/reference/checks
    const response = await github.request("POST /repos/:owner/:repo/check-runs", {
      mediaType: {
        previews: ['antiope']
      },
      owner,
      repo,
      name,
      head_sha: process.env.GITHUB_SHA,
      status: 'completed',
      conclusion: results.length === 0 ? 'success' : 'failure',
      output: {
        title: name,
        summary: `${ name } analysis`,
        annotations
      }
    });
    core.info(`Response status: ${ response.status }.`);

  } catch (e) {
    core.setFailed(e);
  }
}

main();
