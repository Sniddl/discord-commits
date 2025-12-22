import st from "stjs";

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

export function createCommit(commit) {
  const messageSections = commit.message.split("\n\n");
  return {
    title: messageSections[0],
    description: messageSections.slice(1).join("\n\n") || "u200B",
    ...commit,
  };
}

export function parseTemplate(data, template) {
  return st.select(data).transformWith(template).root();
}
