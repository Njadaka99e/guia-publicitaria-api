require("dotenv").config();
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const database = process.env.DBDATABASE;
const host = process.env.DBHOST;
const node_env = process.env.NODE_ENV;

const config = {
  dev: {
    db: {
      username,
      password,
      database,
      host
    }
  },
  test: {},
  prod: {}
};

module.exports = config[node_env];
