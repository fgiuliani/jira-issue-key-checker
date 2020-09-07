const core = require("@actions/core");
const github = require("@actions/github");

const jiraPrefix = core.getInput("jira-prefix");

async function run() {
  try {
    const prTitle = github.context.payload.pull_request.title;
    const prBody = github.context.payload.pull_request.body;

    let regex = new RegExp(`${jiraPrefix}-[0-9]+`);
    if (!regex.test(prTitle) || !regex.test(prBody)) {
      core.setFailed("Jira Issue Key missing in PR title or description.");
      return;
    }
  } catch (error) {
    core.info(error);
  }
}

run();
