import React, { Component } from 'react'
import {Button, ButtonToolbar, Container,Jumbotron } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Details from './Details'
import Navbar from '../navs/Navbar'
import Footer from '../navs/Footer'


export default class Welcome extends Component {

  render() {

    return (
      <div style={{textAlign: "center"}}>
        <Navbar  user={this.props.user} updateUser={this.props.updateUser} history={this.props.history}/>
        <Jumbotron fluid className="mb-5">
          <Container fluid>            
            <img src="https://res.cloudinary.com/dshuazgaz/image/upload/v1605986441/image_9_l2l4wb.png" style={{height: '180px'}} alt="" />
            <p className="lead" style={{color:"#0e3662", fontSize:"40px", fontFamily:"arvo", paddingBottom: "50px"}}>Your favorite tool to manage Bugs</p>
            <div className="cta" >
          <Link  className="button btn  btn-rounded waves-effect" style={{borderRadius:"10px", fontWeight:"bold", fontSize:"20px"}} to="/signup" >Sign up</Link>
          <Link  className="button btn  btn-rounded waves-effect" style={{borderRadius:"10px", fontWeight:"bold", fontSize:"20px"}} to="/login">Log in</Link>
        </div>
          </Container>
        </Jumbotron>
        
        <Details/>
        <Footer/>
      </div>
    )
  }
}
