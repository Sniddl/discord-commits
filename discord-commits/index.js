import core from "@actions/core";
import github from "@actions/github";
import fetch from "node-fetch";
import {
  createCommit,
  loadTemplate,
  parseTemplate,
  stringOrFalse,
  stringToBoolean,
  multilineStringToRegexArray,
} from "./api.js";

const templateName = core.getInput("template") || "plain";
const template = await loadTemplate(templateName);

const message = core.getInput("message") || template.message;
const webhook = core.getInput("webhook");
const lastCommitOnly = stringToBoolean(core.getInput("last-commit-only"));
const extraEmbeds = stringToBoolean(core.getInput("include-extras"))
  ? template.extras || []
  : [];
const includeCommits = multilineStringToRegexArray(
  core.getInput("include-commits"),
);
const excludeCommits = multilineStringToRegexArray(
  core.getInput("exclude-commits"),
);

const embed =
  stringOrFalse(core.getInput("embed")) || JSON.stringify(template.embed);

const DATA = {
  env: { ...process.env },
  github: { ...github },
};

const MAX_EMBEDS = 10;

// console.log({ extraEmbeds, commits: github.context.payload.commits });

if (lastCommitOnly) {
  github.context.payload.commits = github.context.payload.commits.slice(-1);
}

const matchesInclude = (commit) =>
  includeCommits.length === 0 ||
  includeCommits.some((r) => r.test(commit.message));

const matchesExclude = (commit) =>
  excludeCommits.length === 0 ||
  !excludeCommits.some((r) => r.test(commit.message));

let embeds = github.context.payload.commits
  .filter(matchesInclude)
  .filter(matchesExclude)
  .map((commit) => {
    const titledCommmit = createCommit(commit);
    return parseTemplate(
      {
        ...DATA,
        commit: titledCommmit,
      },
      JSON.parse(embed),
    );
  });

embeds = embeds
  .slice(0, Math.min(MAX_EMBEDS - extraEmbeds.length, MAX_EMBEDS))
  .concat(extraEmbeds.map((embed) => parseTemplate(DATA, embed)));

const payload = {
  content: parseTemplate(DATA, message),
  embeds: embeds.filter((x) => x),
};

// console.log({ payload: JSON.stringify(payload) });

try {
  const webhookURL = new URL(webhook);
  webhookURL.searchParams.set("wait", "true");
  await fetch(webhookURL.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Event": "push",
    },
    body: JSON.stringify(payload),
  });
} catch (err) {
  console.error(err);
  core.error(err);
  core.setFailed("Message :", err.response ? err.response.data : err.message);
}
