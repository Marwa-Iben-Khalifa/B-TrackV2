import React, { Component } from 'react'
import service from '../api/service';
import { Redirect, Link } from 'react-router-dom';
import {Navbar, NavDropdown, Nav}from 'react-bootstrap'

export default class NavBar extends Component {

  logout = (event) => {
    service.logout()
      .then(response => {       
        // this.props.history.push('/');
        this.props.updateUser(false);
      })
    ;
  }


  render() {
    return (
      <>
        {!this.props.user._id ? (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dshuazgaz/image/upload/v1605986441/image_9_l2l4wb.png" style={{height: '50px'}} alt="" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" >
              <Nav.Link href="/signup">SignUp</Nav.Link>
              <Nav.Link href="/login">LogIn</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        ) : (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home"><img src="https://res.cloudinary.com/dshuazgaz/image/upload/v1605986441/image_9_l2l4wb.png" style={{height: '50px'}} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" >
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/bugs-list">Bugs List</Nav.Link>
                <Nav.Link href="/services">Services</Nav.Link>
                <Nav.Link href="/new-bug">New Bug</Nav.Link>

              </Nav>
              <Nav>          
                <img src={this.props.user.imageURL} className="rounded-circle z-depth-0" width="40" height="40" alt="avatar image"></img> 
                <NavDropdown eventkey={2} href="/">
                    <NavDropdown.Item href={`/user/${this.props.user._id}/edit`} >My Account</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.logout} >Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
      </>
      
    )
  }
}
