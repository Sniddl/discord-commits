import core from "@actions/core";
import github from "@actions/github";
import fetch from "node-fetch";
import { createCommit, loadTemplate, parseTemplate, stringOrFalse, stringToBoolean } from "./api.mjs";
import defaultPayload from "./defaults/payload-commits.mjs"

const templateName = core.getInput("template") || "plain";
const template = await loadTemplate(templateName)

const message = core.getInput("message") || template.message
const webhook = core.getInput("webhook");
const lastCommitOnly = stringToBoolean(core.getInput("last-commit-only"))
const extraEmbeds = stringToBoolean(core.getInput("include-extras")) ? template.extras || [] : []

const embed = stringOrFalse(core.getInput("embed")) || JSON.stringify(template.embed)

const DATA = {
  env: { ...process.env },
  github: { ...github },
}

github.context.payload.commits ??= defaultPayload

if (lastCommitOnly) {
  github.context.payload.commits = github.context.payload.commits.slice(-1)
}

let embeds = github.context.payload.commits.map(commit => {
  return parseTemplate({
    ...DATA,
    commit: createCommit(commit),
  }, JSON.parse(embed));
})

embeds = embeds.concat(extraEmbeds.map(embed => parseTemplate(DATA, embed)))

const payload = {
  content: parseTemplate(DATA, message),
  embeds: embeds.filter(x => x)
}

try {
  const webhookURL = new URL(webhook);
  webhookURL.searchParams.set('wait','true');
  await fetch(webhookURL.toString(), {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Event": "push",
    },
    body: JSON.stringify(payload)
  })
} catch (err) {
  console.error(err)
  core.error(err)
  core.setFailed(
    "Message :",
    err.response ? err.response.data : err.message
  );
}
