import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TablePagination } from "@material-ui/core";
import ProductDialog from "./ProductDialog";
import { graphql } from "../../../util/graphql";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const PRODUCTS = `query($offset:Int!, $limit:Int!) {
  products(offset:$offset, limit:$limit) {
    count
    list {
      id
      name
      price
      image_url
    }
  }
}`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [dialogProductId, setDialogProductId] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  useEffect(() => {
    graphql({
      query: PRODUCTS,
      variables: {
        offset: rowsPerPage * page,
        limit: rowsPerPage
      }
    }).then(result => {
      setCount(result.products.count);
      setProducts(result.products.list);
    });
  }, [page, rowsPerPage]);
  return (
    <div>
      <h3>상품관리</h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>상품명</TableCell>
            <TableCell>가격</TableCell>
            <TableCell>상품이미지</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: any, i) => {
            return (
              <TableRow key={i} onClick={() => setDialogProductId(product.id)}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toLocaleString()}원</TableCell>
                <TableCell>
                  <img src={product.image_url} alt="상품이미지" width={50} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 30]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, page) => setPage(page)}
        onChangeRowsPerPage={e => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      />
      <ProductDialog
        dialogProductId={dialogProductId}
        setDialogProductId={setDialogProductId}
      />
    </div>
  );
};

export default Products;
