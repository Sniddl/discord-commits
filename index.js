const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");
const axios = require("axios");
const ST = require("stjs");

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function stringToBoolean(string){
  switch(string.toLowerCase().trim()){
    case "false": case "no": case "0": case null: return false;
    default: return true;
  }
}

try {
  const message = core.getInput("message");
  const webhook = core.getInput("webhook");
  const embed =
    core.getInput("embed") ||
    '{ "title": "{{ commit.title }}", "description": "{{ commit.description }}", "url": "{{ commit.url }}", "author": { "name": "{{ commit.author.name }} ({{ commit.author.username }})", "icon_url": "https://avatars.io/gravatar/{{ commit.author.email }}"} }';
  const mergedOnly = stringToBoolean(core.getInput("merged-only"));
  const data = {
    env: { ...process.env },
    github: { ...github },
  };

  if (mergedOnly) {
    github.context.payload.commits = github.context.payload.commits.slice(github.context.payload.commits.length - 1)
  }

  github.context.payload.commits = github.context.payload.commits || [
    {
      author: {
        email: "burroughszeb@me.com",
        name: "Zeb",
        username: "ZebTheWizard",
      },
      message: "this is a title\n\nthis is a description",
    },
    {
      author: {
        email: "burroughszeb@me.com",
        name: "Zeb",
        username: "ZebTheWizard",
      },
      message:
        "testing\n" +
        "\n" +
        "**What is new?**\n" +
        "I'm testing out some capability.\n" +
        "~what do you think?~\n" +
        "```js\n" +
        "console.log('asdf');\n" +
        "```",
    },
  ];

  const embeds = github.context.payload.commits.map((commit) => {
    const $data = {
      ...data,
      commit: {
        title: commit.message.split("\n\n").slice(0, 1).join("\n\n"),
        description: commit.message.split("\n\n").slice(1).join("\n\n"),
        ...commit,
      },
    };

    const parsed = ST.select($data).transformWith(JSON.parse(embed)).root();
    return parsed;
  });

  const payload = {
    content: _.template(message)(data),
    embeds,
  };

  axios
    .post(`${webhook}?wait=true`, JSON.stringify(payload), {
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
