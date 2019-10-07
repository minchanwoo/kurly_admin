import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import User from "./user";

class Order extends Model {}

Order.init(
  {
    item_list: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue("item_list"));
      },
      set(val) {
        this.setDataValue("item_list", JSON.stringify(val));
      }
    }
  },
  {
    sequelize,
    modelName: "order",
    paranoid: true
  }
);

export function relationOrder() {
  Order.belongsTo(User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  User.hasMany(Order, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default Order;
