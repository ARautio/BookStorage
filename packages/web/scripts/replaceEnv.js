const fs = require("fs");

const variables = {
  MANAGER_URL: process.env.MANAGER_URL,
  MANAGER_SOCKET_URL: process.env.MANAGER_SOCKET_URL,
};

let file = fs.readFileSync("./public/build/bundle.js").toString();
Object.keys(variables).forEach((key) => {
  console.log(`Replace process.env.${key} with "${variables[key]}"`);
  file = file.replace(`process.env.${key}`, `"${variables[key]}"`);
});
fs.writeFileSync("./public/build/bundle.js", file);
