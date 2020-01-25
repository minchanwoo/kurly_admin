import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TablePagination } from "@material-ui/core";
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

const USERS = `query($offset:Int, $limit:Int) {
  users(offset:$offset, limit:$limit) {
    count
    list {
      id
      nick
      name
      email
    }
  }
}`;

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    graphql({
      query: USERS,
      variables: {
        offset: rowsPerPage * page,
        limit: rowsPerPage
      }
    }).then(result => {
      setUsers(result.users.list);
      setCount(result.users.count);
    });
  }, [page, rowsPerPage]);

  return (
    <div>
      <h3>회원관리</h3>
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
          {users.map((user: any, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nick}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
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

export default Users;
