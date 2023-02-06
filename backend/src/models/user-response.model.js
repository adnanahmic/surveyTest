const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize").DataTypes;

module.exports = (sequelize, user, survey) => {
  const userReponseSchema = sequelize.define(
    "user-response",
    {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      surveyId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    },
    { underscroed: true }
  );

  user.hasOne(userReponseSchema, {
    foreignKey: "userId",
    onDelete: "cascade",
  });

  survey.hasOne(userReponseSchema, {
    foreignKey: "surveyId",
    onDelete: "cascade",
  });

  userReponseSchema.belongsTo(user);
  userReponseSchema.belongsTo(survey);
  return userReponseSchema;
};
