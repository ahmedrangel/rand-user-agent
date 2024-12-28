import { JSONfrequencyNormalize, JSONIsFrequency, JSONinterval, randomElement } from "./helpers.js";
import data from "./data/user-agents.json" with { type: "json" };
export const randUA = (
  device: string = "",
  browser: string | null = null,
  os: string | null = null
): string => {

  const content = JSONfrequencyNormalize(data);
  if (!JSONIsFrequency(content)) throw new Error("Invalid JSON format");
  const jsonInterval = JSONinterval(content);
  let options: string[] = [];
  const keys = Object.keys(jsonInterval);
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
    return randomElement(jsonInterval[keys[Math.floor(Math.random() * keys.length)]]);
  }
  return randomElement(jsonInterval[options[Math.floor(Math.random() * options.length)]]);
};