import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ScreenHome} />
        <Route path="/articles/:id" component={ScreenArticlesBySource} />
        <Route path="/articles" component={ScreenMyArticles} />
        <Route path="/sources" component={ScreenSource} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );

}

export default App;
