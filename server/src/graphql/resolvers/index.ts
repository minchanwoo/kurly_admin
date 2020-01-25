import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, User, Product, ProductReview } from "../../models";
import { userResolver } from "./User";
import { Op } from "sequelize";

import moment from "moment";

export const resolvers = {
  User: userResolver,
  Query: {
    users: async (_, args) => {
      const { offset, limit, month } = args;

      const list = await User.findAll({
        order: [["ID", "DESC"]],
        ...(offset && { offset }),
        ...(limit && { limit }),
        ...(month && {
          where: {
            createdAt: {
              [Op.and]: [
                { [Op.gte]: moment(month).format("YYYYMM") },
                {
                  [Op.lt]: moment(month, "YYYYMM").add(1, "months")
                }
              ]
            }
          }
        })
      });
      const count = await User.count();
      return {
        count,
        list
      };
    },

    user: async (_, args) => {
      const { id } = args;
      return await User.findOne({ where: { id } });
    },

    products: async (_, args: any) => {
      const list = await Product.findAll({
        order: [["ID", "DESC"]],
        offset: args.offset,
        limit: args.limit
      });

      const count = await Product.count();
      return {
        list,
        count
      };
    },
    product: async (_, args) => {
      const { id } = args;
      return await Product.findOne({ where: { id } });
    },

    reviews: async () => {
      return await ProductReview.findAll({
        order: [["ID", "DESC"]],
        include: [
          {
            model: User
          }
        ]
      });
    }
  },
  Mutation: {
    login: async (_, args: any, context) => {
      const { nick, password } = args;

      try {
        const result = await Admin.findOne({ where: { nick } });
        if (!result) {
          throw new Error("가입하신 닉네임이 없습니다.");
        }
        const compare = await bcrypt.compare(password, result.password);
        if (!compare) {
          throw new Error("입력하신 비밀번호가 맞지 않습니다.");
        }

        const token = jwt.sign(
          {
            id: result.id,
            nick: result.nick
          },
          "SECRET"
        );

        return token;
      } catch (e) {
        throw e;
      }
    }
  }
};
