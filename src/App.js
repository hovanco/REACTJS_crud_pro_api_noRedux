import React, { Component } from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <Router>
        <>
         <Menu />
          <div className="container">
            
            { this.showContentMenus(routes) }
          </div>
        </>
      </Router>
    );
  }

  showContentMenus = (routes) => {
    var result = null;
    if(routes.length > 0){
      result = routes.map((route, index) => {
          return(
            <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )
      });
    }
    return <Switch>{result}</Switch>
  }
}
export default App;
