import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route} from 'react-router';
import Home from './components/Home.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import LoginForm from './components/LoginForm.jsx';

ReactDom.render((
  <Router>
    <Route path="/" component={Home} />
    <Route path="/signup" component={SignUpForm} />
    <Route path="/login" component={LoginForm} />
  </Router>
), document.getElementById('react-app'));
