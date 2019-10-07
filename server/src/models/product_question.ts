import { DataTypes, Model } from "sequelize";
import Product from "./product";
import ProductQuestionRead from "./product_question_read";
import { sequelize } from "./sequelize";
import User from "./user";

class ProductQuestion extends Model {}

ProductQuestion.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "product_question",
    paranoid: true
  }
);

export function relationProductQuestion() {
  ProductQuestion.belongsTo(Product, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  ProductQuestion.belongsTo(User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  ProductQuestion.hasMany(ProductQuestionRead, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default ProductQuestion;
