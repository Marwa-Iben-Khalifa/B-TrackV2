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
    email:""
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
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleFormEdit= (event)=>{
    event.preventDefault();
    const name= this.state.name;
    const phone= this.state.phone;
    const email= this.state.email;
    const id = this.props.dataId;
    service.service.put(`/service/${id}`, {name, phone, email})
      .then(() => {  
        this.getAllServices()          
        this.setState({name: "", phone: "", email: "", dataId:"", show: false});
      })
      .catch( error => console.log(error) )

  }
  
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container-fluid">
          <h2>Service list</h2>
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
              {this.state.listOfServices.map( service => {
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
            <form >
            
              <div className="row md-form">
                <div className="col ">
                  <div className="input-group input-group-lg"></div> 
                  <input type="text" className="form-control" aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm" name="name" placeholder="Service Name"  />
                </div>
                <div className="col ">
                  <div className="input-group input-group-lg"></div>
                  <input className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="phone"
                    placeholder="Phone" />
                </div>
      
                <div className="col ">
                  <div className="input-group input-group-lg"></div>
                  <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="email"
                    placeholder="Mail" />
                </div>
                      
                <div className="col">
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </div>
            </form>
          </div>
              
        </div>


        <Modal className="modal fade " id="editService" tabIndex="-1" role="dialog" show={this.state.show}>
          {/* <div className="modal-dialog" role="document"> */}
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Service</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.setState({show:false})}>
                  <span >&times;</span>
                </button>
              </div>
              
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
          {/* </div> */}
        </Modal>
      </div>
  )}
}


// import { TablePagination } from '@material-ui/core';

// <MaterialTable
//           columns={[
//             { title: 'Adı', field: 'name' },
//             { title: 'Soyadı', field: 'surname' },
//             { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
//             { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
//           ]}
//           data={this.state.data}
//           title="Demo Title"
//           components={{
//             Pagination: props => (
//               <TablePagination
//                 {...props}
//                 labelRowsPerPage={<div style={{fontSize: 14}}>{props.labelRowsPerPage}</div>}
//                 labelDisplayedRows={row => <div style={{fontSize: 14}}>{props.labelDisplayedRows(row)}</div>}
//                 SelectProps={{
//                   style:{
//                     fontSize: 14
//                   }
//                 }}
//               />
//             )
//           }}
//         />