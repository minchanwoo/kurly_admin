import { DataTypes, Model } from "sequelize";
import Cart from "./cart";
import ProductQuestion from "./product_question";
import ProductReview from "./product_review";
import { sequelize } from "./sequelize";

class User extends Model {}

User.init(
  {
    nick: { type: DataTypes.STRING(100), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false }
  },
  {
    sequelize,
    modelName: "user",
    paranoid: true
  }
);

export function relationUser() {
  User.hasMany(Cart, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  User.hasMany(ProductQuestion, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  User.hasMany(ProductReview, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default User;
