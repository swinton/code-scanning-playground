const core = require('@actions/core');

async function main () {
  try {
    const sarifPath = core.getInput('sarif_file');
    const data = require(`./${ sarifPath }`);
    core.info(`sarifPath: ${ sarifPath }`);
    core.info(`data: ${ JSON.stringify(data, null, 4)}`);
  } catch (e) {
    core.setFailed(e);
  }
}

main();
