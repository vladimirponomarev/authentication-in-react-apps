import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route} from 'react-router';
import Dashboard from './components/Dashboard.jsx';
import SignUpCard from './components/SignUpCard.jsx';
import LoginCard from './components/LoginCard.jsx';

ReactDom.render((
  <Router>
    <Route path="/" component={Dashboard} />
    <Route path="/signup" component={SignUpCard} />
    <Route path="/login" component={LoginCard} />
  </Router>
), document.getElementById('container'));
