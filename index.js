const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/action");

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const issueNumber = process.env.GITHUB_REF.split("/")[2];
const jiraPrefix = core.getInput("jira-prefix");
const octokit = new Octokit();

async function run() {
  try {
    const labelName = "Missing Jira issue key";
    const labelColor = "EEEEEE";
    const prTitle = github.context.payload.pull_request.title;
    const prBody = github.context.payload.pull_request.body;

    try {
      let createResponse = await octokit.issues.createLabel({
        owner,
        repo,
        name: labelName,
        color: labelColor,
      });
      core.info(`Creating label (${labelName}) - ` + createResponse.status);
    } catch (error) {
      core.info(`Label (${labelName}) exists.`);
    }

    let regex = new RegExp(`${jiraPrefix}}-[0-9]+`);
    if (!regex.test(prTitle) || !regex.test(prBody)) {
      addLabel(labelName);
      return;
    }

    removeLabel(labelName);
  } catch (error) {
    core.info(error);
  }
}

async function addLabel(name) {
  try {
    let addLabelResponse = await octokit.issues.addLabels({
      owner,
      repo,
      issueNumber,
      labels: [name],
    });
    core.info(`Adding label (${name}) - ` + addLabelResponse.status);
  } catch (error) {
    core.info("Label already added.");
  }
}

async function removeLabel(name) {
  try {
    let removeLabelResponse = await octokit.issues.removeLabel({
      owner,
      repo,
      issueNumber,
      name: name,
    });
    core.info("Check passed. Deleting label - " + removeLabelResponse.status);
  } catch (error) {
    core.info("Label already removed.");
  }
}

run();
