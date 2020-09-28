const core = require('@actions/core');

async function main () {
  try {
    core.info('Hello world');
  } catch (e) {
    core.setFailed(e);
  }
}

main();
