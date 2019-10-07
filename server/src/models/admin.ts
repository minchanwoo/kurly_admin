import { DataTypes, Model } from "sequelize";
import Cart from "./cart";
import ProductQuestion from "./product_question";
import ProductReview from "./product_review";
import { sequelize } from "./sequelize";

class Admin extends Model {}

Admin.init(
  {
    nick: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false }
  },
  {
    sequelize,
    modelName: "admin",
    paranoid: true
  }
);

export default Admin;
