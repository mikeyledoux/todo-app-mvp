import React from 'react';
import {Router, BrowserHistory, Route, IndexRoute } from 'react-router';

import App from './components/app';
import TodosPage from './components/todos-page';

const routes = (
  <Router history={BrowserHistory}>
    <Route path="/" component={App}>
      <Route path="all" component={()=><TodosPage viewFilter={"all"}/>} />
      <Route path="active" component={()=><TodosPage viewFilter={"active"}/>} />
      <Route path="completed" component={()=><TodosPage viewFilter={"completed"}/>} />
      <Route path="archived" component={()=><TodosPage viewFilter={"archived"}/>} />
    </Route>
  </Router>
);

export default routes;
