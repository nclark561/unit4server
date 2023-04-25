import { DataTypes } from "sequelize";
import sequelize from "../util/database";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  hashedPass: DataTypes.STRING,
});

export default User;
