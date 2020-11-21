import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import service from '../api/service'
import { Button, Modal, Form, FormGroup, Row } from 'react-bootstrap';




export default class Signup extends Component {
    // fileInput = React.createRef();
    state = { 
      firstname: "",
      lastname: "" ,
      service: "",
      role: "" ,
      email: "" ,
      password: "" ,
      confirmPassword: "",
      imageURL:"https://res.cloudinary.com/dshuazgaz/image/upload/v1602411437/avatar_el8zal.webp",
      errorMessage:[],
      listOfServices:[]            
    };
  
    getAllServices = () =>{
      axios.get(`http://localhost:3001/api/signup`)
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
    const {firstname, lastname, service, role, email, password, confirmPassword, imageURL} =this.state;


    axios.post("http://localhost:3001/api/signup", { firstname, lastname, service, role, email, password, confirmPassword, imageURL })
    .then( () => {
        this.setState({firstname: "", lastname: "" , service: "", role: "", email: "" , password: "" , confirmPassword: "", imageURL:"https://res.cloudinary.com/dshuazgaz/image/upload/v1602411437/avatar_el8zal.webp" }); })
    .catch( (error)=> this.setState({errorMessage:error.response.data.message}))
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handelUpload=(event) =>{
    const uploadData = new FormData();
    uploadData.append('imageURL', event.target.files[0]);
    service.upload(uploadData)
    .then(response =>{
      this.setState({ imageURL: response.imageURL });
    })
    .catch(err => {
      console.log('Error while uploading the file: ', err);
    });

  }


  render() {
    return (
      
        <Modal className="modal fade " id="orangeModalSubscription" tabIndex="-1" role="dialog" show={this.props.showSignup} >
          {/* <div className="modal-dialog modal-notify " role="document"> */}
            
            <Form className="modal-content form-elegant" onSubmit={this.handleFormSubmit}>
              
              <Modal.Header className="modal-header text-center">
                <h4 className="modal-title  w-100 font-weight-bold py-2" style={{color:"#0e3662" , fontSize:"40px"}}>Sign up</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onHideSignup}>
                  <span aria-hidden="true" className="Bleu-text">&times;</span>
                </button>
              </Modal.Header>

              {this.state.errorMessage.length >0 && (<div> {this.state.errorMessage.map(el=> <li>key{el}</li>)} </div>)}

              <Modal.Body className="modal-body">
                  
                <Row>
                  <FormGroup className="md-form mb-2">                  
                    <i className="fa fa-user prefix grey-text"></i>
                    <input  type="text" name="firstname" placeholder="Firstname" className="form-control validate " id="inputFirstName"  value={this.state.firstname} onChange={this.handleChange} />
                    <label htmlFor="inputFirstName"></label>

                  </FormGroup>
                  <FormGroup className="md-form mb-2">
                    <i className="fa fa-user prefix grey-text"></i>
                    <input type="text" name="lastname" placeholder="Lastname" className="form-control validate" id="inputLastname" value={this.state.lastname} onChange={this.handleChange} />
                    <label htmlFor="inputLastname"></label>
                  </FormGroup>
                </Row>
                
                <Row>
                  <FormGroup className="md-form mb-2">
                    <i className="fa fa-envelope prefix grey-text"></i>
                    <input type="email" name="email" placeholder="Email adress" className="form-control validate" id="inputEmail"  value={this.state.email} onChange={this.handleChange} />
                    <label data-error="wrong" data-success="right" htmlFor="inputEmail"></label>
                  </FormGroup>
                </Row>
                
                <Row>
                  <FormGroup className="md-form mb-2">
                    <i className="fas fa-lock prefix grey-text"></i>
                    <input type="password" name="password" placeholder="Password" className="form-control validate" id="inputPassword"  value={this.state.password} onChange={this.handleChange}/>
                    <label htmlFor="inputPassword"></label>
                  </FormGroup>
                  <FormGroup className="md-form mb-2">
                    <i className="fas fa-lock prefix grey-text"></i>
                    <input type="password" name="confirmPassword" className="form-control validate" id="inputConfirmPassword"
                      value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.handleChange} />
                    <label htmlFor="inputConfirmPassword"></label>
                  </FormGroup>
                </Row>

                <Row>
                  <FormGroup className="md-form mb-2">                  
                    <i className="fa fa-camera prefix grey-text"></i>
                    <Form.File type="file" className="custom-file-input" id="input-image"  onChange={this.handelUpload} />
                    <label htmlFor="input-image">Choose Avatar</label>                  
                  </FormGroup>
                </Row>

                <Row>
                  <Form.Control as="select"
                      className="mr-sm-2 mt-2"
                      id="inlineFormCustomSelect" 
                      value={this.state.service}
                      name="service"
                      id="inputService"
                      onChange={(this.handleChange)}
                      custom>
                        {/* afficher tous les service dans une boite select */}
                        {this.state.listOfServices.map( service => {
                          return (
                            <option value={service._id}>{service.name}</option>
                          )})
                        } 
                  </Form.Control>
                  <Form.Control as="select"
                    className="mr-sm-2 mt-2"
                    id="inlineFormCustomSelect" 
                    value={this.state.role}
                    name="role"
                    id="inputRole"
                    onChange={this.handleChange}
                    custom>
                    <option value="">Choose Role...</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                    <option value="validator">Validator</option>                    
                  </Form.Control>
                </Row>
              </Modal.Body>
              
                <div className="modal-footer justify-content-center mb-3">
                  <Button type="submit" size="lg" className="btn blue-gradient btn-block btn-rounded z-depth-1a ">Register<i className="fas fa-paper-plane-o ml-1"></i></Button>
                  <Button type="reset" className="btn btn-black">Reset</Button>
                </div>
            </Form>
            <Modal.Footer>              
                <p className="forgot-password text-right">
                  Already registered <a href="#">log in?</a>
                </p>
            </Modal.Footer>
            
          {/* </div> */}
        </Modal>
      
    )
  }
}
