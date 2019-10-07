import { Model } from "sequelize";
import ProductQuestion from "./product_question";
import { sequelize } from "./sequelize";

class ProductQuestionRead extends Model {}

ProductQuestionRead.init(
  {},
  {
    sequelize,
    modelName: "product_question_read",
    paranoid: true
  }
);

export function relationProductQuestionRead() {
  ProductQuestionRead.belongsTo(ProductQuestion, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default ProductQuestionRead;
