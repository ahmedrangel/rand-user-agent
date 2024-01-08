import { randUA } from "@ahmedrangel/rand-user-agent";

// ...

// Fetching the raw JSON URL file from rand-user-agent repository
const response = await fetch("https://raw.githubusercontent.com/WebScrapingAPI/rand-user-agent/master/data/user-agents.json");

// Using Coudflare R2
// const response = await env.YOUR_BUCKET.get("user-agents.json");
const jsonData = await response.json();
const agent = randUA(jsonData, "desktop");

console.log(agent);