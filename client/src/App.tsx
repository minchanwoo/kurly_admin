import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const nick = useSelector((state: any) => state.nick);

  return (
    <Router>
      <div style={{ height: "100%" }}>
        {nick ? (
          <>
            <Route path="/" exact component={Home} />
          </>
        ) : (
          <Route path="/" component={Login} />
        )}
      </div>
    </Router>
  );
};

export default App;
