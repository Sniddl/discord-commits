import st from "stjs";
import { CommitParser } from "conventional-commits-parser";

export async function loadTemplate(name) {
  try {
    return (await import(`./templates/${name}.js`)).default;
  } catch (err) {
    return (await import(`./templates/plain.js`)).default;
  }
}

export function stringToBoolean(string) {
  switch (string.toLowerCase().trim()) {
    case "false":
    case "no":
    case "0":
    case "":
    case null:
      return false;
    default:
      return true;
  }
}

export function multilineStringToArray(string) {
  return string
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x);
}

export function multilineStringToRegexArray(string) {
  return multilineStringToArray(string).map((x) => new RegExp(x));
}

export function stringOrFalse(string) {
  switch (string.toLowerCase().trim()) {
    case "false":
    case "no":
    case "0":
    case "":
    case null:
      return false;
    default:
      return string;
  }
}

export function createCommit(
  commit,
  { includeFooter, noteKeywords } = {
    includeFooter: true,
    noteKeywords: false,
  },
) {
  const messageSections = commit.message.split("\n\n");
  const parser = new CommitParser({
    noteKeywords,
  });
  const parsed = parser.parse(commit.message);
  let description = messageSections.slice(1).join("\n\n");
  if (!includeFooter) {
    description = parsed.body;
  }
  const data = {
    title: parsed.header,
    description,
    ...commit,
    ...parsed,
  };
  return data;
}

export function parseTemplate(data, template) {
  return st.select(data).transformWith(template).root();
}
