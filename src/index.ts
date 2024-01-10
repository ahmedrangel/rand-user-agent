import { JSONfrequencyNormalize, JSONIsFrequency, JSONinterval, randomElement } from "./helpers.js";
import data from "./data/user-agents.js";
export const randUA = (
  device: string,
  browser: string | null = null,
  os: string | null = null,
): string => {

  let content: Record<string, any> = data;
  content = JSONfrequencyNormalize(content);
  if (JSONIsFrequency(content)) {
    content = JSONinterval(content);
  }
  let options: string[] = [];
  const keys = Object.keys(content);
  for (const index in keys) {
    let filter = true;
    if (keys[index].indexOf(device) === -1) {
      filter = false;
    }
    if (browser && keys[index].indexOf(browser) === -1) {
      filter = false;
    }
    if (os && keys[index].indexOf(os) === -1) {
      filter = false;
    }
    if (filter) {
      options.push(keys[index]);
    }
  }
  if (options.length === 0) {
    return randomElement(content);
  }
  return randomElement(
    content[options[Math.floor(Math.random() * options.length)]]
  );
};