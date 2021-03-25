const fs = require("fs");

const MANAGER_URL = `"${process.env.MANAGER_URL}"`;

const file = fs.readFileSync("./public/build/bundle.js").toString();
const updatedFile = file.replace("process.env.MANAGER_URL", MANAGER_URL);
fs.writeFileSync("./public/build/bundle.js", updatedFile);
