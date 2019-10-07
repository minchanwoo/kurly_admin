import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import User from "./user";

class OrderSheet extends Model {}

OrderSheet.init(
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
    modelName: "order_sheet",
    paranoid: true
  }
);

export function relationOrderSheet() {
  OrderSheet.belongsTo(User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  User.hasMany(OrderSheet, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default OrderSheet;
