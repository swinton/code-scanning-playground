const path = require('path');
const core = require('@actions/core');

async function main () {
  try {
    // Load SARIF
    const sarifPath = core.getInput('sarif_file');
    const data = require(path.join(process.env.GITHUB_WORKSPACE, sarifPath));
    core.info(`sarifPath: ${ sarifPath }`);

    // Process SARIF
    const results = sarif.runs[0].results;
    await Promise.all(results.map(async result => {
      console.log(JSON.stringify(result, null, 4));
      return result;
    }));
  } catch (e) {
    core.setFailed(e);
  }
}

main();
