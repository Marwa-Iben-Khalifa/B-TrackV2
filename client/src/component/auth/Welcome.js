import React, { Component } from 'react'
import {Button, ButtonToolbar, Container,Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

export default class Welcome extends Component {
  state={
    modalShowLogin:false,
    modalShowSignup: false,
    listOfServices:[]
  }

  

  // modalClose=()=> this.setState({modalShow:false})


  render() {
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>            
            <img src="https://res.cloudinary.com/dshuazgaz/image/upload/v1605986441/image_9_l2l4wb.png" style={{height: '180px'}} alt="" />
            <p className="lead" style={{color:"#0e3662", fontSize:"40px", fontFamily:"arvo"}}>Your favorite tool to manage Bugs</p>
          </Container>
        </Jumbotron>
        <ButtonToolbar style={{marginLeft: "auto", marginRight:"auto"}}>
          
          <button className="btn blue-gradient  btn-rounded z-depth-1a" size="lg" onClick={() => this.setState({modalShowSignup:true})}>
            Let's Start
          </button>

          <Signup  showSignup={this.state.modalShowSignup} onHideSignup={() => this.setState({modalShowSignup:false})} />
          
          <button className="btn blue-gradient  btn-rounded z-depth-1a" size="lg" onClick={() => this.setState({modalShowLogin:true})}>
            LogIn
          </button>

          <Login  showLogin={this.state.modalShowLogin} onHideLogin={() => this.setState({modalShowLogin:false})} />
        
        </ButtonToolbar>        
      </div>
    )
  }
}
