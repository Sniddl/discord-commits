import core from "@actions/core";
import github from "@actions/github";
import fetch from "node-fetch";
import { createCommit, loadTemplate, parseTemplate, stringToBoolean } from "./api.mjs";
import defaultPayload from "./defaults/payload-commits.mjs"

const templateName = core.getInput("last-commit-only") || "plain";
const template = await loadTemplate(templateName)

const message = core.getInput("message") || template.message
const webhook = core.getInput("webhook");
const lastCommitOnly = stringToBoolean(core.getInput("last-commit-only"))
const extraEmbeds = stringToBoolean(core.getInput("include-extras")) ? template.extras || [] : []

const embed = JSON.stringify(template.embed)

const DATA = {
  env: { ...process.env },
  github: { ...github },
}

github.context.payload.commits ??= defaultPayload

if (lastCommitOnly) {
  github.context.payload.commits = github.context.payload.commits.slice(-1)
}

console.log({ template: template.embed })
console.log({ extraEmbeds })
console.log({ embed })

let embeds = github.context.payload.commits.map(commit => {
  return parseTemplate({
    ...DATA,
    commit: createCommit(commit),
  }, JSON.parse(embed));
})

// embeds = embeds.concat(extraEmbeds.map(embed => parseTemplate(DATA, embed)))

console.log({ embeds })

const payload = {
  content: parseTemplate(DATA, message)
}

// console.log(defaultPayload)

// const payload = {
//   content: "Hello world",
//   embeds: [
//     {
//       title: "Hello embed",
//       description: "Hello embed description",
//       // url: "https://google.com",
//       author: {
//         name: "Wade Zimmerman",
//         //   icon_url: "https://avatars.io/gravatar/codingsurplus@gmail.com"
//       }
//     }
//   ]
// }

try {
  await fetch(`${webhook}?wait=true`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Event": "push",
    },
    body: JSON.stringify(payload)
  })
} catch (err) {
  console.error("Error:", err);
  core.setFailed(
    "Message :",
    err.response ? err.response.data : err.message
  );
}
