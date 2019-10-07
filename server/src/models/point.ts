import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import User from "./user";

class Point extends Model {}

Point.init(
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "point",
    paranoid: true
  }
);

export function relationPoint() {
  Point.belongsTo(User, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
  User.hasMany(Point, {
    foreignKey: { allowNull: false },
    onDelete: "CASCADE"
  });
}

export default Point;
