import React, { Component } from 'react'
import axios from 'axios';
import service from '../api/service';
import { Redirect } from 'react-router-dom';
import {Container} from 'react-bootstrap'
import Navbar from "../navBar/Navbar"
import Footer from '../navBar/Footer'




export default class Dashboard extends Component {
  

  logout = (event) => {
    service.logout()
      .then(response => {
        this.props.updateUser(false);
      })
    ;
  }

  render() {
    console.log("user",this.props.user)
    return (
      <>
        {!this.props.user._id ? (
          <Redirect to="/" />
        ) : (
          
            <Container fluid >
              <Navbar user={this.props.user} updateUser={this.props.updateUser}/>
              <Container style={{marginBottom:"60px", height:"100%"}}>
              </Container>
              <Footer/>
              
            </Container>
          
        )}
      </>
    )
  }
}
