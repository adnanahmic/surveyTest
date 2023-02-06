const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize").DataTypes;

module.exports = (sequelize) => {
  const userSchema = sequelize.define(
    "users",
    {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      surname: {
        type: Sequelize.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    { underscroed: true }
  );
  return userSchema;
};
