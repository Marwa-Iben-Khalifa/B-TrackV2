import React, { Component } from 'react'
import axios from 'axios';
import service from '../api/service'


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


    service.newBug(this.state.title, this.state.description, this.state.solution, this.state.services, this.state.status, this.state.severity)
    .then((res) => {      
      console.log("ok!")
      this.setState({title:"", description:"", solution:"", services: [], status:"", severity:"", errorMessage:[] });
      // this.props.updateUser(response);
      this.props.history.push('/');        
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


  render() {
    return (
      <div className="container-fluid">

        <form className="container w-75" onSubmit={this.handleFormSubmit}>

          <div className="form-group row mt-5">
            <h3 className="col-sm-2 col-form-label ">New Bug</h3>
            <div className="col-sm-10 mt-1">
              <p>Fill all the fields then click on Add in order to create a new bug.</p>
            </div>
          </div>
          <div className="form-group row mt-5">
            <label for="title" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input id="title" type="text" name="title" className="form-control" placeholder="Ex: Error when..." onChange={this.handleChange}/>
            </div>
          </div>
        
          <div className="form-group row">
            <label for="des" className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <textarea id="des" placeholder="Ex: This error occur when..." type="text" name="description" rows="3"
                className="form-control" onChange={this.handleChange}></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label for="sol" className="col-sm-2 col-form-label">Solution</label>
            <div className="col-sm-10">
              <textarea id="sol" type="text" name="solution" rows="3" className="form-control"
                placeholder="Ex: Some solution..." onChange={this.handleChange}></textarea>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Services</label>
            {/* afficher tous les service dans une boite select */}
            {this.state.listOfServices.map( service => {
              return (
                <div className="form-check form-check-inline">
                  <input className="ml-3 form-check-input" name="services" type="checkbox" value={service._id}  key={service._id} onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor={service.name}> {service.name}</label>
                </div>
              )})
            } 
            
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" >Status</label>
            <div className="col-sm-10" onChange={this.handleChange}>
              <input type="radio" name="status" defaultChecked value="Confirmed" /><label className="ml-1">Confirmed </label>
              <input className="ml-3" type="radio" name="status" value="In Progress" /> <label>In Progress </label>
              <input className="ml-3" type="radio" name="status" value="Resolved" /> <label>Resolved </label>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" >Severity</label>
            <div className="col-sm-10" onChange={this.handleChange}>
              <input type="radio" name="severity" defaultChecked value="Critical" /><label className="ml-1">Critical </label>
              <input className="ml-3" type="radio" name="severity" value="High" /> <label>High </label>
              <input className="ml-3" type="radio" name="severity" value="Medium" /> <label>Medium </label>
              <input className="ml-3" type="radio" name="severity" value="Low" /> <label>Low </label>
            </div>
          </div>


          <button type="submit" className="btn btn-primary"><i className=" mr-1 far fa-save"></i> Create</button>
          <button type="reset" className="btn btn-secondary">Reset</button>

        </form>
      </div>
    
    )
  }
}
