import React, { useEffect, useState } from "react";
import { graphql } from "../../../util/graphql";

import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";

import {
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const REVIEWS = `
query {
  reviews {
    id
    title
    text
    createdAt
    user {
      id
      nick
      name
    }
  }
}
`;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    graphql({
      query: REVIEWS
    }).then(result => {
      result.reviews.map((re: any) => {
        re.createdAt = new Date(Number(re.createdAt)).toISOString();
      });
      setReviews(result.reviews);
    });
  }, []);
  return (
    <div>
      <h2>상품후기관리</h2>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>내용</TableCell>
            <TableCell>작성일</TableCell>
            <TableCell>작성자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review: any, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{review.id}</TableCell>
                <TableCell>{review.title}</TableCell>
                <TableCell
                  dangerouslySetInnerHTML={{ __html: review.text }}
                ></TableCell>
                <TableCell>
                  {moment(review.createdAt).format("YYYY/MM/DD hh:mm:ss")}
                </TableCell>
                <TableCell>{review.user.nick}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Reviews;
