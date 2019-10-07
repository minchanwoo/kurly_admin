import { DataTypes, Model } from "sequelize";
import Product from "./product";
import { sequelize } from "./sequelize";
import User from "./user";

class ProductReview extends Model {}

ProductReview.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "product_review",
    paranoid: true
  }
);

export function relationProductReview() {
  ProductReview.belongsTo(Product, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  ProductReview.belongsTo(User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default ProductReview;
