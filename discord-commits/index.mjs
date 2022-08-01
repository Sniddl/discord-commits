import core from "@actions/core";
import github from "@actions/github";
import { createCommit, loadTemplate, parseTemplate, stringToBoolean } from "./api.mjs";
import defaultPayload from "./defaults/payload-commits.mjs"


const message = core.getInput("message")
const webhook = core.getInput("webhook");
const lastCommitOnly = stringToBoolean(core.getInput("last-commit-only"))
const templateName = core.getInput("last-commit-only") || "plain";

const embed = await loadTemplate(templateName)

const DATA = {
  env: { ...process.env },
  github: { ...github },
}

github.context.payload.commits ??= defaultPayload

if (lastCommitOnly) {
  github.context.payload.commits = github.context.payload.commits.slice(-1)
}

const embeds = github.context.payload.commits.map(commit => {
  return parseTemplate({
    ...DATA,
    commit: createCommit(commit),
  }, JSON.parse(embed));
})

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
  core.setFailed(
    "Message :",
    err.response ? err.response.data : err.message
  );
}
