import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'



export default class CRUDServices extends Component {
  state={
    listOfServices:[]
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

  
  render() {
    return (
      <div>
        <div className="container-fluid">
          <h2>Service list</h2>
          <div className="table-responsive table-hover">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>E-mail</th>
                  <th>Action</th>
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
                      <a href="#"> <button className="btn btn-danger"><i
                        className="fas fa-trash-alt"></i></button></a>
                      <button  className="btn btn-info" data-toggle="modal" data-target="#editModal"
                        data-id={service._id} data-name={service.name} data-phone={service.phone} data-email={service.email}> <i
                        className="far fa-edit"></i> </button>
                    </td>
                  </tr>
                  )})
                }
              </tbody>
            </table>
            <div>
              <form >
              
                <div className="input-group input-group-lg"></div> 
                <input type="text" className="form-control" aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm" name="name" placeholder="Service Name" />
                
                <div>
                  <div className="input-group input-group-lg"></div>
                  <input className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="phone"
                    placeholder="Phone" />
                </div>
      
                <div>
                  <div className="input-group input-group-lg"></div>
                  <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="email"
                    placeholder="Mail" />
                </div>
    
                
                <div>
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
              
          </div>
        </div>


        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" show={true}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Service</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span >&times;</span>
                </button>
              </div>
              
              <form id="popup-edit-from" action="/services/edit" method="POST">
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="popup-service-name" className="col-form-label">Name:</label>
                    <input id="popup-service-name" name="name" type="text" className="form-control"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="popup-service-phone" className="col-form-label">Phone:</label>
                    <input id="popup-service-phone" name="phone" type="text" className="form-control"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="popup-service-email" className="col-form-label">Email:</label>
                    <input id="popup-service-email" name="email" type="text" className="form-control"/>
                  </div>              
                </div>
                <div div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary"><i className=" mr-1 far fa-save"></i>Save</button>
                </div>
              </form>   
            </div>
          </div>
        </div>
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