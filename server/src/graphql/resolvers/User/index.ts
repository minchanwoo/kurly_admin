import { ProductReview, ProductQuestion } from "../../../models";

export const userResolver = {
  email: (user: { email: string }) =>
    user.email.slice(0, 1) + "*" + user.email.slice(2),
  nick: (user: { nick: string }) =>
    user.nick.slice(0, 1) + "*" + user.nick.slice(2),
  productReviews: async (user: any) => {
    return await ProductReview.findAll({ where: { userId: user.id } });
  },
  productQuestions: async (user: any) => {
    return await ProductQuestion.findAll({ where: { userId: user.id } });
  }
};
