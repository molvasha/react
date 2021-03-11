import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import ChatLayout from './ChatLayout.jsx';
import Profile from './Profile.jsx';


export default class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route exact path="/profile" component={Profile}/>
      </Switch>
    );
  }
}

