import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import { SignIn, SignUp, Jokes } from './components';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path='/jokes' component={Jokes} />
      </div>
    );
  }
}

