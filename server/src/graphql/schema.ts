import { gql } from "apollo-server-express";

export const schema = gql`
  type ProductReview {
    id: ID!
    title: String!
    text: String!
    createdAt: String!
    user: User!
  }

  type ProductQuestion {
    id: ID!
    title: String!
    text: String!
  }

  type User {
    id: ID!
    nick: String!
    name: String!
    email: String!
    createdAt: String!
    productReviews: [ProductReview!]!
    productQuestions: [ProductQuestion!]!
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    image_url: String!
  }

  type usersInfo {
    list: [User!]!
    count: Int!
  }

  type productsInfo {
    list: [Product]!
    count: Int!
  }

  type Query {
    users(offset: Int, limit: Int, month: String): usersInfo!
    user(id: ID!): User!
    products(offset: Int!, limit: Int!): productsInfo!
    product(id: ID!): Product!
    reviews: [ProductReview!]!
  }

  type Mutation {
    login(nick: String!, password: String!): String!
  }
`;
