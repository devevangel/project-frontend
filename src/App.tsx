import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Auth from './pages/Auth';
import Add from './pages/Add';
import Main from './pages/Main';
import User from './pages/User';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/me" component={User} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
