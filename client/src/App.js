import logo from './logo.svg';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Welcome from './component/auth/Welcome'
import React, { Component } from 'react'
import { Button, Container } from 'react-bootstrap';


export default class App extends Component {
  // state={
  //   listOfUsers:[]
  // }
  // getAllUsers = () =>{
  //   axios.get(`http://localhost:3001/api/signup`)
  //   .then(responseFromApi => {
  //     this.setState({
  //       listOfUsers: responseFromApi.data
  //     })
  //   })
  // }
  render(){
  return (
    <div className="App">
      <Welcome  />
      {/* <BrowserRouter>          
            <Switch>
              <Route exact path="/signup" component={Signup}/>
            </Switch>
      </BrowserRouter>     */}
    </div>
  )}
}
