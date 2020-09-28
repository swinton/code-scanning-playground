const path = require('path');
const core = require('@actions/core');

async function main () {
  try {
    const sarifPath = core.getInput('sarif_file');
    const data = require(path.join(process.env.GITHUB_WORKSPACE, sarifPath));
    core.info(`sarifPath: ${ sarifPath }`);
    core.info(`data: ${ JSON.stringify(data, null, 4)}`);
  } catch (e) {
    core.setFailed(e);
  }
}

main();
