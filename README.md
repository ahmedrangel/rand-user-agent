# Random User Agent

This is an adapted version of [rand-user-agent](https://www.npmjs.com/package/rand-user-agent) specifically designed for environments lacking access to server file systems, such as Cloudflare Workers.
- Obtain the dataset of User-Agents by downloading the raw JSON file from the [rand-user-agent data](https://raw.githubusercontent.com/WebScrapingAPI/rand-user-agent/master/data/user-agents.json) by WebScrapingAPI.
- Enhance access efficiency by storing this data in a Bucket service of your convenience (Amazon S3, Cloudflare R2, ...).

## Installation

Run the following command in the main folder of your project:

```shell
# Using npm
npm i @ahmedrangel/rand-user-agent

# Using pnpm
pnpm add @ahmedrangel/rand-user-agent

# Using yarn
yarn add @ahmedrangel/rand-user-agent
```

## Usage Example 

```js
import { randUA } from "@ahmedrangel/rand-user-agent";

// ...

// Fetching the raw JSON URL file from rand-user-agent repository
// const response = await fetch("https://raw.githubusercontent.com/WebScrapingAPI/rand-user-agent/master/data/user-agents.json");

// Using Coudflare R2
const response = await env.YOUR_BUCKET.get("user-agents.json");
const jsonData = await response.json();
const agent = randUA(jsonData, "desktop");

console.log(agent);
```

You can also provide a browser and an operating system in the parameters of randUA in order to filter out the user agents:

```js
import { randUA } from "@ahmedrangel/rand-user-agent";

// ...

const agent = randUA(jsonData, "desktop", "chrome", "linux");

console.log(agent);
```