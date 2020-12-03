import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, Form, FormGroup, Alert } from 'react-bootstrap';


export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (

      <nav class="navbar navbar-expand-lg navbar-dark indigo mb-1" style={{backgroundColor:"#86b6bd"}}>
        <a class="navbar-brand" href="http://localhost:3000/">Home</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="form-inline ml-auto">
            <div class="md-form my-0">
              <input class="form-control" type="text" placeholder="Search" aria-label="Search"/>
            </div>
              <button href="#!" class="btn btn-outline-white btn-md my-0 ml-sm-2" type="submit">Search</button>
          </form>
        </div>
      </nav>
    )
  }
}
