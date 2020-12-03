import React, { Component } from 'react'
import {Button, ButtonToolbar, Container,Jumbotron } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard'
import Details from '../auth/Details'
import Nav from '../auth/Nav'

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
          <Nav/>
            <Jumbotron fluid className="mb-5">
              <Container fluid>            
                <img src="https://res.cloudinary.com/dshuazgaz/image/upload/v1605986441/image_9_l2l4wb.png" style={{height: '180px'}} alt="" />
                <p className="lead" style={{color:"#0e3662", fontSize:"40px", fontFamily:"arvo", paddingBottom: "50px"}}>Your favorite tool to manage Bugs</p>
                <div className="cta" >
              <Link className="button " class="btn  btn-rounded waves-effect" style={{borderRadius:"10px", fontWeight:"bold", fontSize:"20px"}} to="/signup" >Sign up</Link>
              <Link className="button  " class="btn  btn-rounded waves-effect" style={{borderRadius:"10px", fontWeight:"bold", fontSize:"20px"}} to="/login">Log in</Link>
            </div>
              </Container>
            </Jumbotron>
            
           <Details/>
           
          </div>)} />
        )}
      </div>
    )
  }
}
