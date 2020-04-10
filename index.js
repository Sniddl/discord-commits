const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

// try {
//   const message = core.getInput("message");
//   const webhook = core.getInput("webhook");
//   const commit = core.getInput("commit");

//   console.log(message);
//   console.log(commit);
//   console.log(github);
// } catch (error) {
//   core.setFailed(error.message);
// }

const data = { env: { ...process.env } };
const content = _.template("hello, {{ data }}")({ data: "asdf" });
console.log(data);
console.log(github);
