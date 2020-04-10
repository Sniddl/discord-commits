const core = require("@actions/core");
const github = require("@actions/github");

try {
  const message = core.getInput("message");
  const webhook = core.getInput("webhook");
  const commit = core.getInput("commit");

  console.log(message);
  console.log(commit);
  console.log(github);
} catch (error) {
  core.setFailed(error.message);
}
