const { Sequelize } = require("sequelize");
const DataTypes = require("sequelize").DataTypes;

module.exports = (sequelize) => {
  const adminSchema = sequelize.define(
    "admin",
    {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
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
      password: {
        type: DataTypes.STRING,
      },
    },
    { underscroed: true }
  );
  return adminSchema;
};
