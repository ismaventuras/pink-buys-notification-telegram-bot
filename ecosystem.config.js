const dotenv = require('dotenv');

module.exports = {
  apps: [{
    name: "pink-buys-notifications",
    script: "./dist/index.js",
    env: dotenv.config().parsed,
    time: true
  }]
}
