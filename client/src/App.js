import React, { Component } from 'react'
import './App.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

import Welcome from './component/auth/Welcome'
import Signup from './component/auth/Signup'
import Login from './component/auth/Login'
import Dashboard from './component/dashboard/Dashboard'
import service from './component/api/service'
import NewBug from './component/bug/NewBug'
import BugDetails from './component/bug/BugDetails'
import BugsList from './component/bug/BugsList'


export default class App extends Component {
  state= {
    user: {}
  }
  fetchUser = () => {
    if (!this.state.user._id) {
      service.loggedin()
        .then(data => this.setState({user: data}))
        .catch(err => this.setState({user: {}}))
      ;
    } else {
      console.log('user already in the state')
    }
  };

  updateUser = (data) => {
    this.setState({user: data});
  };

  componentDidMount() {
    this.fetchUser();
  }

  render(){
  return (
    <div className="App">
      <BrowserRouter>          
      <Route render={props => (
      <div className="App" data-route={props.location.pathname}> {/* data-route="/" allow us to style pages */}

        <Switch>
          <Route exact path="/" render={(props) => (
            <Welcome user={this.state.user} />
          )} />

          <Route exact path="/signup" render={(props) => (
            <Signup user={this.state.user} updateUser={this.updateUser} history={props.history} />
          )} />

          <Route exact path="/login" render={(props) => (
            <Login user={this.state.user} updateUser={this.updateUser} history={props.history} />
          )} />

          <Route exact path="/dashboard" render={(props) => (
            <Dashboard user={this.state.user} updateUser={this.updateUser} history={props.history} />
          )} />

          <Route exact path="/new-bug" render={(props) => (
            <NewBug user={this.state.user}  history={props.history} />
          )} />

          <Route exact path="/:id/bug-details" render={(props) => (
            <BugDetails user={this.state.user}  history={props.history} {...props} />
          )} />
          
          <Route exact path="/bugs-list" render={(props) => (
            <BugsList user={this.state.user}  history={props.history}  />
          )} />

          {/* last route, ie: 404 */}
          <Route render={() => (<h1>Not Found</h1>)} />
        </Switch>
      </div>
    )} />
      </BrowserRouter>    
    </div>
  )}
}
