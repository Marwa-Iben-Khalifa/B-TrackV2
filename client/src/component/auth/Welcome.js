import React, { Component } from 'react'
import {Button, ButtonToolbar, Container,Jumbotron } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard'

import Popin from '../Popin.js';


export default class Welcome extends Component {
  state={
  
  }

  render() {
    return (
      <div>
        {this.props.user._id ? (
        <Redirect to="/dashboard" />
        ) : (
        <Popin one={(
          <div>
            <Jumbotron fluid>
              <Container fluid>            
                <img src="https://res.cloudinary.com/dshuazgaz/image/upload/v1605986441/image_9_l2l4wb.png" style={{height: '180px'}} alt="" />
                <p className="lead" style={{color:"#0e3662", fontSize:"40px", fontFamily:"arvo"}}>Your favorite tool to manage Bugs</p>
              </Container>
            </Jumbotron>
            <div className="cta">
              <Link className="btn blue-gradient  " to="/signup">Sign up</Link>
              <Link className="btn blue-gradient  " to="/login">Log in</Link>
            </div>
          </div>)} />
        )}
      </div>
    )
  }
}
