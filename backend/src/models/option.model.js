const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize").DataTypes;

module.exports = (sequelize, question) => {
  const optionSchema = sequelize.define(
    "options",
    {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      questionId: {
        type: Sequelize.UUID,
      },
      name: {
        type: DataTypes.TEXT,
      },
    },
    { underscroed: true }
  );

  question.hasMany(optionSchema, {
    foreignKey: "questionId",
    onDelete: "cascade",
  });
  optionSchema.belongsTo(question, { foreignKey: "questionId" });

  return optionSchema;
};
