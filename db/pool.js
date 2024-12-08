const { Pool } = require("pg")

module.exports = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: "fileuploader",
  password: process.env.DB_PASSWORD,
  port: 3005
})
