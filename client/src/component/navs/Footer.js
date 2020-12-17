import React, { Component } from 'react'
import {Navbar}from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom';


export default class Footer extends Component {
  render() {
    return (
      <Navbar bg="dark" style={{display: "flex", justifyContent: "center"}} >
        <Navbar.Brand >
          <Link to="/aboutUs" className="text-muted text-center">© Copy right Marwa & Wafâa</Link>
        </Navbar.Brand>
      </Navbar>
    )
  }
}
