import Cart, { relationCart } from "./cart";
import Product, { relationProduct } from "./product";
import ProductQuestion, { relationProductQuestion } from "./product_question";
import ProductQuestionRead, {
  relationProductQuestionRead
} from "./product_question_read";
import ProductReview, { relationProductReview } from "./product_review";
import { sequelize } from "./sequelize";
import Order, { relationOrder } from "./order";
import OrderSheet, { relationOrderSheet } from "./order_sheet";
import User, { relationUser } from "./user";
import Point, { relationPoint } from "./point";
import Admin from "./admin";

relationProduct();
relationUser();
relationCart();
relationOrder();
relationOrderSheet();
relationProductQuestion();
relationProductQuestionRead();
relationProductReview();
relationPoint();

export {
  sequelize,
  Product,
  Order,
  OrderSheet,
  User,
  Cart,
  ProductQuestion,
  ProductQuestionRead,
  ProductReview,
  Point,
  Admin
};
