import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, Form, FormGroup, Row, Alert } from 'react-bootstrap';
import axios from 'axios'
import Navbar from '../component/navBar/Navbar'
import service from '../component/api/service';




export default class CRUDServices extends Component {
  state={
    listOfServices:[],
    show: false,
    dataId:"",
    name:"",
    phone:"",
    email:"",
    errorMessage:[],
    errorMessageEdit:[],
    sortby:"",
    query:""
  }
  
  componentDidMount() {
    this.getAllServices();
  }

  getAllServices = () =>{
    axios.get(`http://localhost:3001/api/services`)
    .then(responseFromApi => {
      this.setState({
        listOfServices: responseFromApi.data.servicesFromDB
      })
    })
  }

  deleateService=(id)=> {
    axios.get(`http://localhost:3001/api/delete-service/${id}`)
    .then(
      this.getAllServices()
    )
    .catch((error)=> this.setState({errorMessage:error.response.data.message}))
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  // Update the `query` state on change
  handleQuery = (ev) => {
    this.setState({
      query: ev.target.value
    })
  }

  handleFormEdit= (event)=>{
    event.preventDefault();
    const name= this.state.name;
    const phone= this.state.phone;
    const email= this.state.email;
    const id = this.state.dataId;
    service.service.put(`/service/${id}`, {name, phone, email})
      .then(() => {  
        console.log(`name: ${name} phone:${phone} email:${email}`)
        this.getAllServices()          
        this.setState({name: "", phone: "", email: "", dataId:"",errorMessageEdit:[], show: false});
      })
      .catch((error)=> this.setState({errorMessageEdit:error.response.data.message}))

  }

  handleFormSubmit= (event)=>{
    event.preventDefault();
    const name= this.state.name;
    const phone= this.state.phone;
    const email= this.state.email;
    service.service.post(`/new-service`, {name, phone, email})
      .then(() => {  
        console.log(`name: ${name} phone:${phone} email:${email}`)
        this.setState({name: "", phone: "", email: "", errorMessage:[]});
        this.getAllServices()
      })
      .catch((error)=> this.setState({errorMessage:error.response.data.message}))

  }
  
  render() {
    let serv = [...this.state.listOfServices]; // make a copy (prevent mutating if .sort)
    const query = this.state.query;

    // sort by name
    if (this.state.sortby === 'name') {
      serv.sort((a, b) => a.name.localeCompare(b.name))
    }

    // sort by popularity
    if (this.state.sortby === 'email') {
      serv.sort((a, b) => a.email.localeCompare(b.email))
    }
    
    // Filter `foods` with `query`
    if (query) {
      serv = serv.filter(service => service.name.includes(query))
    } 
    return (
      <div>
        <Navbar/>
        <div className="container-fluid">
          <h2>Service list</h2>
            <Row className="fluid">
              <Form.Control as="select"
                className="col-md-1 md-form"
                id="inlineFormCustomSelect" 
                value={this.state.sortby}
                name="sort"
                id="sortList"
                onChange={(e)=> this.setState({sortby: e.target.value})}
                custom>
                <option value="default">Sort by...</option>
                <option value="name">Name</option>
                <option value="email">Email</option>                    
              </Form.Control>
              <div className="col-md-4 md-form ">
                <i className="fas fa-search prefix grey-text"></i>
                <input className="form-control validate md-form" type="search" placeholder="Search" value={this.state.query} onChange={this.handleQuery} />
              </div>
            </Row>
          <table className="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <td>Name</td>
                <td>Phone</td>
                <td>E-mail</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {serv.map( service => {
                return (
                <tr key={service._id}>
                  <td>{service.name}</td>
                  <td>{service.phone}</td>
                  <td>{service.email}</td>
                  <td className="d-flux">
                    <button className="btn btn-danger" onClick={(event)=>{this.deleateService( service._id)}}>
                      <i className="fas fa-trash-alt" ></i></button>
                    <button  className="btn btn-info" data-toggle="modal" data-target="#editModal" onClick={()=> this.setState({show:true, dataId:service._id, name:service.name, phone:service.phone, email:service.email })}> 
                    <i className="far fa-edit" ></i> </button>
                  </td>
                </tr>
                )})
              }
            </tbody>
          </table>
          
          <div>
            {this.state.errorMessage.length > 0 && (
              <div> {this.state.errorMessage.map((el, index)=> 
                (
                <Alert key={index} variant={'danger'}>{el}</Alert>
                ))} 
              </div>
            )}
            <form  onSubmit={this.handleFormSubmit}>
            
              <div className="row md-form">
                <div className="col ">
                  <div className="input-group input-group-lg"></div> 
                  <input type="text" className="form-control" aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="col ">
                  <div className="input-group input-group-lg"></div>
                  <input className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="phone"
                    placeholder="Phone" value={this.state.phone} onChange={this.handleChange} />
                </div>
      
                <div className="col ">
                  <div className="input-group input-group-lg"></div>
                  <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="email"
                    placeholder="Mail" value={this.state.email} onChange={this.handleChange}/>
                </div>
                      
                <div className="col">
                  <button type="submit" className="btn btn-secondary">Add</button>
                </div>
              </div>
            </form>
          </div>
              
        </div>


        <Modal className="modal fade " id="editService" tabIndex="-1" role="dialog" show={this.state.show}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Service</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.setState({show:false, errorMessageEdit:[]})}>
                <span >&times;</span>
              </button>
            </div>
            
            {this.state.errorMessageEdit.length > 0 && (
              <div> {this.state.errorMessageEdit.map((el, index)=> 
                (
                <Alert key={index} variant={'danger'}>{el}</Alert>
                ))} 
              </div>
            )}
            
            <form id="popup-edit-from" onSubmit={this.handleFormEdit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="popup-service-name" className="col-form-label">Name:</label>
                  <input id="popup-service-name" name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                  <label htmlFor="popup-service-phone" className="col-form-label">Phone:</label>
                  <input id="popup-service-phone" name="phone" type="text" className="form-control" value={this.state.phone} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                  <label htmlFor="popup-service-email" className="col-form-label">Email:</label>
                  <input id="popup-service-email" name="email" type="text" className="form-control" value={this.state.email} onChange={this.handleChange}/>
                </div>              
              </div>
              <div div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary"><i className=" mr-1 far fa-save"></i>Save</button>
              </div>
            </form>   
          </div>
        </Modal>
      </div>
  )}
}
