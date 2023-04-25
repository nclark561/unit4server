import { DataTypes } from "sequelize";
import sequelize from "../util/database";

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  privateStatus: DataTypes.BOOLEAN,
});

export default Post;
