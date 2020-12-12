import React, { Component } from 'react';
import axios from 'axios';
import srv from './api/service'
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, Form, Row, Alert , Col, InputGroup, Table, Container, Spinner, FormGroup} from 'react-bootstrap';
import Navbar from './navBar/Navbar'
import Footer from './navBar/Footer'



export default class userProfil extends Component {
  state={
    user:null,
    _id:"",
    firstname:"",
    lastname:"",
    email:"",
    role:"",
    service:"",
    imageURL:"",
    password:"",
    confirmPassword:"",
    listOfServices: [],
    errorMessage:"",
    successMessage : undefined
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

  componentDidUpdate(prevProps, prevState){
    if (!prevProps.user._id && this.props.user._id) {
      console.log ('componentDidUpdate', this.props.user)
      this.setState(this.props.user)
    } 
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleUpload=(event) =>{
    const uploadData = new FormData();
    uploadData.append('imageURL', event.target.files[0]);
    srv.upload(uploadData)
    .then(response =>{
      this.setState({ imageURL: response.imageURL });
    })
    .catch(err => {
      console.log('Error while uploading the file: ', err);
    });

  }

  handleReset = (event) => {
    this.setState({firstname: this.props.user.firstname ,lastname: this.props.user.lastname , role:this.props.user.role , service:this.props.user.service, imageURL:this.props.user.imageURL ,errorMessage: "", successMessage:""})
  }

  handleResetPassword = (event) => {
    this.setState({password: "",confirmPassword: "", successMessage:"", errorMessage: ""})
  }

  handleFormSubmit = (event) => {
    const {firstname, lastname, service, role, imageURL} = this.state
    console.log("state est : ",this.state)
    srv.service.put(`/${this.state._id}/edit`, {firstname, lastname, service, role, imageURL})
    .then((response) => {  
        this.props.updateUser(response); 
        this.setState({successMessage: "profile updated successfully" });
        event.preventDefault();
        console.log('then', response)     
    })
    .catch((error)=> this.setState({errorMessage:error.response.data.message}))
    
  }
  
  handleFormSubmitPassword = (event) => {
    event.preventDefault();
    const {password, confirmPassword} = this.state
    srv.service.put(`/${this.state._id}/edit-password`, {password, confirmPassword})
    .then((response) => {
      this.props.updateUser(response);   
      this.setState({password:"", confirmPassword: "", errorMessage:[], successMessage: "Password updated successfully"  });
    })
    .catch((error)=> {console.log("error:", error.response.data.message)
  this.setState({errorMessage:error.response.data.message})})
  }
  showContainer = () => {
    return(
      <div>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    )
  }


  


  render(){
    // if (this.state.user === null) return this.showContainer()
    // if (this.state.user === false) return <Redirect to="/"/>
    return (
      <Container fluid>
        <Navbar user={this.props.user} updateUser={this.props.updateUser}/>
        <Container className="border" style={{textAlign:"left" , color: "#300032", fontWeight:"bolder", marginBottom:"60px"}}>
          <Form.Group as={Row}>
            <h3 className="col-sm-10 mt-1">My Account</h3>
            <small className="text-secondary form-text text-muted mt-0">
              Fill your modifications here
            </small>
          </Form.Group >
          <Form className="  border-top pt-4" onSubmit={this.handleFormSubmit} onReset={this.handleReset}>           

            {this.state.errorMessage && (
              <div> {this.state.errorMessage.map((el, index)=> 
                (
                <Alert key={index} variant={'danger'}>{el}</Alert>
                ))} 
              </div>
            )}
            
            { this.state.successMessage &&
              <Alert>
                <strong>Awsome!</strong>  {this.state.successMessage}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </Alert>
            }

            <Row>
              <Form.Group as={Col} md="4"  htmlFor="firstname">
                <Form.Label className="mb-3" as={Row}>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  id="firstname"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4"  htmlFor="lastname">
                <Form.Label className="mb-3" as={Row}>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  id="lastname"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            
            <Form.Group as={Col} md="8" >
              <Form.Label className="mb-3" as={Row}>Email</Form.Label>
              <Form.Control
                readOnly
                type="text"
                name="email"
                defaultValue={this.state.email}
                id="email"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Row style={{paddingLeft: "16px"}}>
              <FormGroup className="md-form custom-file">
                <i className="fa fa-camera prefix grey-text"></i>
                <input type="file" className="custom-file-input" name="image" id="input-image" onChange={this.handleUpload}/>
                <label  htmlFor="input-image" value={this.state.imageURL} >Choose Avatar</label>
              </FormGroup>
            </Row>
        
            <Row className="mt-4 mb-2">
              <Col md="4">
                <Form.Control  as="select"  id="inlineFormCustomSelect" value={this.state.service} name="service" id="inputService" onChange={this.handleChange}  custom>
                  {/* afficher tous les services dans une boite select */}
                  <option value="">Service</option>
                  {this.state.listOfServices.map( service => {
                    return (
                      <option key={service._id} value={service._id}>{service.name}</option>
                    )})
                  } 
                </Form.Control>
              </Col>
              <Col md="4">
                <Form.Control as="select"
                  id="inlineFormCustomSelect" value={this.state.role} name="role" id="inputRole" onChange={this.handleChange}  custom>
                  <option value="">Role</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                  <option value="validator">Validator</option>                    
                </Form.Control>       
              </Col>              
            </Row>
            <Row >
              <button type="submit" className="btn btn-primary mt-4" ><i className=" mr-1 far fa-save" ></i>Save</button>
              <button type="reset" className="btn btn-secondary mt-4">Reset</button>
            </Row>
          </Form>
                    
          <Form className="mt-5  border-top pt-4"  onSubmit={this.handleFormSubmitPassword } onReset={this.handleResetPassword}>
            <Row  md="8">
              <Form.Group as={Col} md="4"  htmlFor="inputPassword">
                <Form.Label className="mb-3" as={Row}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="********"
                  id="inputPassword"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4"  htmlFor="inputConfirmPassword">
                <Form.Label className="mb-3" as={Row}>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  placeholder="********"
                  id="inputConfirmPassword"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row >
              <button type="submit" className="btn btn-primary mt-4"><i className=" mr-1 far fa-save"></i>Save Password</button>
              <button type="reset" className="btn btn-secondary mt-4">Reset</button>
            </Row>
          </Form>
        </Container>
        <Footer/>
      </Container>

    )     
  }
}
