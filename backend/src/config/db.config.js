const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_DIALECT,
  logging: false,
  dialectOptions: {
    useUTC: false,
  },
  timezone: '+08:00'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection is successfully!');
  })
  .catch((error) => {
    console.log('Database connection is falied!', error);
  });

module.exports = sequelize;
