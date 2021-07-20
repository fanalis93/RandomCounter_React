import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { LastLocationProvider } from 'react-router-last-location';
import NotFound from "../components/NotFound";
import Dashboard from "../components/Dashboard";
import Report from "../components/Report";
const createHistory = require("history").createBrowserHistory;
export const history = createHistory();

const AppRouter = () => {
    return(
    <Router history={history}>
      <LastLocationProvider>
      <div>
        <Switch>
            <Route exact path="/" component={Dashboard} history={history} />
            <Route exact path="/report" component={Report} history={history} />
            <Route component={NotFound}/>
        </Switch>
      </div>
      </LastLocationProvider>
    </Router>
  )};
  
  export default AppRouter;