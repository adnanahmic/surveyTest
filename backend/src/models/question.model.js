const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize").DataTypes;

module.exports = (sequelize, survey) => {
  const questionSchema = sequelize.define(
    "questions",
    {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      isRequired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      surveyId: {
        type: Sequelize.UUID,
      },
      question: {
        type: DataTypes.STRING,
      },
    },
    { underscroed: true }
  );

  survey.hasMany(questionSchema, {
    foreignKey: "surveyId",
    onDelete: "cascade",
  });
  questionSchema.belongsTo(survey, { foreignKey: "surveyId" });
  return questionSchema;
};
