import React, { useEffect, useState } from "react";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TablePagination } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  useEffect(() => {
    Axios.get(
      `http://localhost:5000/products?offset=${page *
        rowsPerPage}&limit=${rowsPerPage}`,
      { withCredentials: true }
    ).then(result => {
      setCount(result.data.count);
      setProducts(result.data.result);
    });
  }, [page]);
  return (
    <div>
      <h3>상품관리</h3>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>닉네임</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>이메일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: any, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.image_url}</TableCell>
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
    </div>
  );
};

export default Products;
