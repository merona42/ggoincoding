
module.exports = {
  development: {
    username: "inha07",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "gg_f_db",
    host: "gimp-log-rds-07.cxeaceo4qj3m.ap-southeast-1.rds.amazonaws.com",
    dialect: "mysql"
  },
  test: {
    username: "inha07",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "gg_f_db_test",
    host: "gimp-log-rds-07.cxeaceo4qj3m.ap-southeast-1.rds.amazonaws.com",
    dialect: "mysql"
  },
  production: {
    username: "inha07",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "gg_f_db",
    host: "gimp-log-rds-07.cxeaceo4qj3m.ap-southeast-1.rds.amazonaws.com",
    dialect: "mysql",
    logging: false,
  }

}
