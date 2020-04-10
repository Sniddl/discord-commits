const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");
const axios = require("axios");

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

try {
  const message = core.getInput("message");
  const webhook = core.getInput("webhook");
  const embed = core.getInput("embed") || '{ "title": "{{ env.OS }}" }';
  const data = {
    env: { ...process.env },
    github: { ...github },
  };

  github.context.payload.commits = github.context.payload.commits || [
    { message: "this is a title\n\nthis is a description" },
    { message: "this is a title\n\nthis is a description" },
  ];

  console.dir(github);
  console.dir(github.context.payload);

  const embeds = github.context.payload.commits.map((commit) => {
    const $data = {
      ...data,
      commit: {
        title: commit.message.split("\n\n").slice(0, 1).join("\n\n"),
        description: commit.message.split("\n\n").slice(1).join("\n\n"),
        ...commit,
      },
    };

    console.log($data);

    return JSON.parse(_.template(embed)($data));
  });

  const payload = JSON.stringify({
    content: _.template(message)(data),
    embeds,
  });

  axios
    .post(`${webhook}?wait=true`, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Event": github.context.eventName || "push",
      },
    })
    .then((res) => {
      console.log("Message sent ! Shutting down ...");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error :", err.response.status, err.response.statusText);
      core.setFailed(
        "Message :",
        err.response ? err.response.data : err.message
      );
    });
} catch (error) {
  core.setFailed(error.message);
}
