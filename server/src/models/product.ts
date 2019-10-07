import { DataTypes, Model } from "sequelize";
import Cart from "./cart";
import ProductQuestion from "./product_question";
import ProductReview from "./product_review";
import { sequelize } from "./sequelize";

class Product extends Model {}

Product.init(
  {
    name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING(1000), allowNull: false }
  },
  {
    sequelize,
    modelName: "product",
    paranoid: true
  }
);

export function relationProduct() {
  Product.hasMany(Cart, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  Product.hasMany(ProductQuestion, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  Product.hasMany(ProductReview, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default Product;
