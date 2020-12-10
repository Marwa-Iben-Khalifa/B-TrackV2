import React, { Component } from 'react'
import axios from 'axios';
import srv from '../api/service'
import Navbar from "../navBar/Navbar"

import { Button, Form, Row, Alert , Col, InputGroup, Table, Container, FormControl} from 'react-bootstrap';



export default class NewBug extends Component {
  state={
    title:"",
    description:"",
    solution:"",
    services: [],
    status:"",
    severity:"",
    listOfServices:[],
    errorMessage:[]  
  }

  getAllServices = () =>{
    axios.get(`http://localhost:3001/api/findServices`)
    .then(responseFromApi => {
      this.setState({
        listOfServices: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllServices();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();


    srv.newBug(this.state.title, this.state.description, this.state.solution, this.state.services, this.state.status, this.state.severity)
    .then((res) => {      
      console.log("ok!")
      this.setState({title:"", description:"", solution:"", services: [], status:"", severity:"", errorMessage:[] });
      // this.props.updateUser(response);
      this.props.history.push('/bugs-list');        
    })
    .catch((error)=> this.setState({errorMessage:error.response.data.message}))
  }

  handleChange = (event) => {  
    const target = event.target;
    const name = target.name;
    const serv= this.state.services;
    target.type === 'checkbox' 
    ? 
    (this.setState({services:[...serv , target.value]}))
    : 
    this.setState({[name]: target.value});
  }

  handleReset = (event) => {
    this.setState({title:"", description:"", solution:"", services: [], status:"", severity:"", errorMessage:[]  })
  }


  render() {
    console.log(this.props.user)
    return (
      <Container fluid>
        <Navbar user={this.props.user} updateUser={this.props.updateUser}/>
        <Container className="border" style={{textAlign:"left" , color: "#300032", fontWeight:"bolder"}}>
          <Form onSubmit={this.handleFormSubmit} onReset={this.handleReset}>

            <Form.Group as={Row}>
              <h3 className="col-sm-10 mt-1">New Bug</h3>
              <small className="text-secondary form-text text-muted mt-0">
                Fill all the fields then click on Add in order to create a new bug.
              </small>
            </Form.Group >

            <Form.Group as={Col} md="8"  htmlFor="title">
              <Form.Label className="mb-3" as={Row}>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Ex: Error when..."
                id="title"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="8">
              <Form.Label className="mb-3" htmlFor="des" as={Row}>Description:</Form.Label>
              <FormControl as="textarea" id="des"  name="description" rows="3" 
              placeholder="Ex: Some solution..." onChange={this.handleChange}></FormControl>
            </Form.Group>
          
            <Form.Group as={Col} md="8">
              <Form.Label className="mb-3" htmlFor="sol" as={Row}>Solution:</Form.Label>
              <FormControl as="textarea" id="sol"  name="solution" rows="3" 
              placeholder="Ex: Some solution..." onChange={this.handleChange}></FormControl>
            </Form.Group> 

            <Form.Group as={Col} >
              <Form.Label className="mb-3" as={Row}>Services:</Form.Label>
              {this.state.listOfServices.map( service => {
                return (
                  <Form.Group id="formGridCheckbox">
                    <Form.Check key={service._id} name="services" type="checkbox" label={service.name} value={service._id} onChange={this.handleChange}/>
                  </Form.Group>
                )})
              } 
              
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="mb-3" as={Row} >Status:</Form.Label>
              <Form.Group id="formGridRadio">
                <Form.Check type="radio" label="Confirmed" name="status" defaultChecked value="Confirmed" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group id="formGridRadio">
                <Form.Check type="radio" label="InProgress" name="status" value="In Progress" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group id="formGridRadio">
                <Form.Check type="radio" label="Resoveld" name="status" value="Resolved" onChange={this.handleChange}/>
              </Form.Group>
                
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="mb-3" as={Row} >Severity:</Form.Label>
              <Form.Group id="formGridRadio">
                <Form.Check type="radio" label="Critical" name="severity" defaultChecked value="Critical" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group id="formGridRadio">
                <Form.Check type="radio" label="High" name="severity" value="High" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group id="formGridRadio">
                <Form.Check type="radio" label="Medium" name="severity" value="Medium" onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group id="formGridRadio">
                <Form.Check type="radio" label="Low" name="severity" value="Low" onChange={this.handleChange}/>
              </Form.Group>
            </Form.Group>


            <Button type="reset" variant="secondary" >Reset</Button>
            <Button type="submit" variant="primary"><i className=" mr-1 far fa-save"></i>Save</Button>

          </Form>

        </Container>
      </Container>
    
    )
  }
}
