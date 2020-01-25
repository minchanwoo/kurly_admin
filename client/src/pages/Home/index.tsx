import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { Route, Link } from "react-router-dom";

import Main from "./Main";
import Products from "./Products";
import Orders from "./Orders";
import Users from "./Users";
import Reviews from "./Reviews";
import Questions from "./Questions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: 100,
    flexShrink: 0
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  link: {
    textDecoration: "none",
    color: "#000"
  }
}));

const MENUES = [
  { path: "/", name: "홈", exact: true, component: Main },
  { path: "/products", name: "상품관리", component: Products },
  { path: "/orders", name: "주문관리", component: Orders },
  { path: "/users", name: "사용자관리", component: Users },
  { path: "/questions", name: "문의관리", component: Questions },
  { path: "/reviews", name: "후기관리", component: Reviews }
];

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer variant="permanent" className={classes.drawer}>
        <List>
          {MENUES.map((menu, i) => {
            return (
              <ListItem key={i}>
                <ListItemText>
                  <Link className={classes.link} to={menu.path}>
                    {menu.name}
                  </Link>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        {MENUES.map((menu, i) => {
          return (
            <Route
              key={i}
              exact={menu.exact}
              path={menu.path}
              component={menu.component}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Home;
