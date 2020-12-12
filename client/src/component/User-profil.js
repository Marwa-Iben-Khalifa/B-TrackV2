import React, { Component } from 'react';
import axios from 'axios';
import srv from './api/service'
import { Button, Modal, Form, FormGroup, Row, Alert } from 'react-bootstrap';



export default class userProfil extends Component {
  state={
    id:this.props.user._id,
    firstname: this.props.user.firstname,
    lastname: this.props.user.lastname,
    email: this.props.user.email,
    role: this.props.user.role,
    service: this.props.user.service,
    imageURL: this.props.imageURL,
    password:"",
    confirmPassword:"",
    listOfServices: [],
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
    this.setState({firstname: "",lastname: "" , role:'', service:'', imageURL:'',error: ""})
  }

  handleResetPassword = (event) => {
    this.setState({password: "",confirmPassword: ""})
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {firstname, lastname, service, role, imageURL} = this.state
    console.log("state est : ",this.state)
    srv.service.put(`/${this.state.id}/edit`, {firstname, lastname, service, role, imageURL})
    .then((response) => {  
        this.props.updateUser(response);   
        this.setState({firstname:"", lastname: "" , service: "", role: "", imageURL:"", errorMessage:[],
        successMessage: "success" });
        console.log('then', this.state)
     
  })
    .catch((error)=> this.setState({errorMessage:error.response.data.message}))
  }
  
  handleFormSubmitPassword = (event) => {
    event.preventDefault();
    const {password, confirmPassword} = this.state
    srv.service.put(`/${this.state.id}/edit-password`, {password, confirmPassword})
    .then((response) => {
        this.props.updateUser(response);   
        this.setState({password:"", confirmPassword: "", errorMessage:[] });
        
     
  })
    .catch((error)=> this.setState({errorMessage:error.response.data.message}))
  }


  // handleFormSubmitPassword = (event) => {
  //   event.preventDefault();

  //   srv.signup(this.state.password, this.state.confirmPassword)
  //   .then(() => {      
  //     // 2. then, update with user infos
  //     service.edit(this.state.password, this.state.confirmPassword)
  //     .then(response => {
  //       // this.setState({errorMessage: ""});
  //       this.setState({password: "" , confirmPassword: ""});

  //       this.props.updateUser(response);
  //       // this.props.history.push('/');
        
  //     })
  //     .catch((error)=> this.setState({errorMessage:error.response.data.message}))
  // })
  //   .catch((error)=> this.setState({errorMessage:error.response.data.message}))
  // }


  render(){
    console.log("props: ", this.props.user);
    console.log("state: ", this.state);
    return (
      <div className="container-fluid">
        
        <div className="container w-75">
          {/* {{>error}} */}
          <form onSubmit={this.handleFormSubmit} onReset={this.handleReset}>

            <div className="form-group row mt-5 border-bottom">
              <h2 className="col-sm-3 mt-3">My Account</h2>
              <div className="col-sm-4 mt-4">
                <p>Fill your modifications here </p>
              </div>
            </div>
            
          { this.state.successMessage &&
           

            <div className="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong>  {this.state.successMessage}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
          }


           

            <div className="form-group row mt-5">
              <label htmlFor="firstname"   className="col-sm-2 col-form-label">First Name</label>
              <div className="col-sm-10">
                <input id="firstname" type="text" name="firstname" value={this.state.firstname} className="form-control" onChange={this.handleChange}/>
              </div>
            </div>

            <div className="form-group row ">
              <label htmlFor="lastname" className="col-sm-2 col-form-label">Last Name</label>
              <div className="col-sm-10">
                <input id="lastname" type="text" name="lastname" value={this.state.lastname} className="form-control" onChange={this.handleChange}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">E-mail</label>
              <div className="col-sm-10">
                <input readOnly id="email"  type="text" name="email" defaultValue={this.state.email} className="form-control" />
              </div>
            </div>
            <div className="input-group mb-3 mt-5">
              <div className="custom-file">
                <input type="file" className="custom-file-input" name="image" id="input-image" onChange={this.handleUpload}/>
                <label className="custom-file-label" htmlFor="input-image" value={this.state.imageURL} >Choose Avatar</label>
              </div>
            </div>
            <div className="form-row  mt-3 ">
            <div className= "col-6">
            <Form.Control as="select" className=" form-group" id="inlineFormCustomSelect" value={this.state.service} name="service" id="inputService" onChange={this.handleChange} style={{border:"none", borderBottom: "1px solid #D9DEE0"}} custom>
                    {/* afficher tous les services dans une boite select */}
                    <option value="">Service</option>
                    {this.state.listOfServices.map( service => {
                      return (
                        <option key={service._id} value={service._id}>{service.name}</option>
                      )})
                    } 
              </Form.Control>
            </div>
            <div className= "col-6">
            <Form.Control as="select"
                className=" form-group" id="inlineFormCustomSelect" value={this.state.role} name="role" id="inputRole" onChange={this.handleChange} style={{border:"none", borderBottom: "1px solid #D9DEE0"}} custom>
                <option value="">Role</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="validator">Validator</option>                    
              </Form.Control>       
            </div>
              
            </div>
            <button type="submit" className="btn btn-primary"><i className=" mr-1 far fa-save"></i>Save</button>
            <button type="reset" className="btn btn-secondary">Reset</button>
          </form>
                    
          <form className="mt-5 border-top pt-3"  onSubmit={this.handleFormSubmitPassword } onReset={this.handleResetPassword}>
            <div className="form-row mt-3">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" name="password" className="form-control" id="inputPassword" value={this.state.password} placeholder="********" onChange={this.handleChange}/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputConfirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-control" id="inputConfirmPassword" value={this.state.confirmPassword} placeholder="********" onChange={this.handleChange}/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary"><i className=" mr-1 far fa-save"></i>Save Password</button>
            <button type="reset" className="btn btn-secondary">Reset</button>
          </form>
        </div>
      </div>

    )     
  }
}
