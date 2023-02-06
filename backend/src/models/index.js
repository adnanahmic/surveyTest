const { Sequelize } = require("sequelize");
const sequelize = require("../config/db.config");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = require("./admin.model")(sequelize);
db.Survey = require("./survey.model")(sequelize);
db.Questions = require("./question.model")(sequelize, db.Survey);
db.Option = require("./option.model")(sequelize, db.Questions);
db.User = require("./user.model")(sequelize);

db.UserResponse = require("./user-response.model")(
  sequelize,
  db.User,
  db.Survey
);

db.Answer = require("./answer.model")(
  sequelize,
  db.Questions,
  db.Option,
  db.UserResponse
);

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-aync db");
});

module.exports = db;
