import { DataTypes, Model } from "sequelize";
import Product from "./product";
import { sequelize } from "./sequelize";
import User from "./user";

class Cart extends Model {}

Cart.init(
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "cart",
    paranoid: true
  }
);

export function relationCart() {
  Cart.belongsTo(User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  Cart.belongsTo(Product, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default Cart;
