import React, { Component } from 'react'
import axios from 'axios';
import service from '../api/service';
import { Redirect } from 'react-router-dom';
import Navbar from "../navBar/Navbar"



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
          
            <>
              <Navbar user={this.props.user} updateUser={this.props.updateUser}/>
              <div className="cta">
                <button className="btn logout" onClick={this.logout}>Logout</button>
              </div>
            
              
            </>
          
        )}
      </>
    )
  }
}
