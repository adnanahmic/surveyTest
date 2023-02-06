const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize").DataTypes;

module.exports = (sequelize, question, option, userResponse) => {
  const answerSchema = sequelize.define(
    "answer",
    {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      userResponseId: {
        type: DataTypes.UUID,
      },
      questionId: {
        type: DataTypes.UUID,
        references: {
          model: "questions",
          key: "id",
        },
      },
      optionId: {
        type: DataTypes.UUID,
        references: {
          model: "options",
          key: "id",
        },
      },
    },
    { underscored: true }
  );

  userResponse.hasMany(answerSchema, {
    foreignKey: "userResponseId",
    onDelete: "cascade",
  });
  answerSchema.belongsTo(userResponse, { foreignKey: "id" });
  answerSchema.belongsTo(question, {
    foreignKey: "questionId",
    as: "question",
    onDelete: "cascade",
  });
  answerSchema.belongsTo(option, {
    foreignKey: "optionId",
    as: "option",
    onDelete: "cascade",
  });

  return answerSchema;
};
