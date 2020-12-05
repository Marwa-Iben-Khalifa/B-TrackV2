import React, { Component } from 'react'
import axios from 'axios';
import srv from '../api/service';
import { Button, Modal, Form, FormGroup, Row, Alert } from 'react-bootstrap';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';


import { Link } from 'react-router-dom';




export default class BugDetails extends React.Component {
  state = {
    bug: "",
    rapportedAt: "",
    solutions: [],
    services: [],
    rapporter: {},
    
    status: "",
    severity: "",
    solution: "",
    errorMessage:[],
    show: false
  };



  getBugFromApi = () => {
    const { params } = this.props.match;
    srv.service.get(`/${params.id}/details`)
      .then(response => {
        console.log('coucou', response.data)
        this.setState({
          bug: response.data.result,
          rapportedAt: response.data.rapportedAt,
          solutions: response.data.solutions,
          services: response.data.result.services,
          rapporter: response.data.result.rapporter
        })
      })
  }

  componentDidMount() {
    this.getBugFromApi();
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const serv = this.state.services;
    target.type === 'checkbox'
      ?
      (this.setState({ services: [...serv, target.value] }))
      :
      this.setState({ [name]: target.value });
  }

  handleFormSubmit= (event)=>{
    event.preventDefault();
    const {status, severity, solution}= this.state;
    const { params } = this.props.match;
    srv.service.post(`/${params.id}/solution`, {status, severity, solution})
      .then(() => {
        this.setState({status: "", severity: "", solution: "",errorMessage:[], show: false});
        this.getBugFromApi() 
        this.props.history.push(`/${params.id}/bug-details`);
        console.log('hello', this.state)
      })
      .catch((error)=> this.setState({errorMessage:error.response.data.message}))

  }
  

  render() {
    return (
      <div className="container" style={{textAlign:"left" , color: "#300032", fontWeight:"bolder"}}>
        {/* <div className="row">
          <div className="col-12">
            <h3>Bug details:</h3>
          </div>
        </div> */}

        {/* {this.state.bug.severity === "Critical" 
        &&
        <div className="border pl-3" style={{backgroundColor:"black"}}>
          <h3 className="text-muted">Bug Overview</h3>
        </div>}
        {this.state.bug.severity === "High" 
        && 
        <div className="border pl-3" style={{backgroundColor: "red"}}>
          <h3 className="text-muted">Bug Overview</h3>
        </div>
        }
        {this.state.bug.severity === "Medium" 
        && 
        <div className="border pl-3" style={{backgroundColor: "blue"}}>
          <h3 className="text-muted">Bug Overview</h3>
        </div>}
        {this.state.bug.severity === "Low" 
        && 
        <div className="border pl-3" style={{backgroundColor: "green"}}>
          <h3 className="text-muted">Bug Overview</h3>
        </div>} */}
          

        <div className="border pl-3  text-white" style={{backgroundColor:"#7189da"}} >
          <h3 >Bug Overview</h3>
        </div>

        <div className="container border">
          <div className="row my-2">
            <div className="col-4">Title:</div>
            <p className="col-8">{this.state.bug.title}</p>
          </div>

          <div className="row mb-2 border-top">
            <div className="col-4">Rapported by</div>
            <div className="col-8">
              <div>
                <label className="mb-0">{this.state.rapporter.firstname} {this.state.rapporter.lastname}</label>
                <small className=" form-text text-muted mt-0 "> {this.state.rapportedAt.rapportDay} at
                  {this.state.rapportedAt.rapportTime}</small>
              </div>
            </div>
          </div>

          <div className="row mb-2 border-top">
            <div className="col-4">Services</div>
            <div className="col-8">                
              {this.state.services.map((el) => (
                <div>
                  <label className="mb-0">{el.name}</label>
                  <small className=" form-text text-muted mt-0 ">{el.email}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="row mb-2 border-top">
            <div className="col-4">Status</div>
            <p className="col-8">{this.state.bug.status}</p>
          </div>  
            
          <div className="row mb-2 border-top">
            <div className="col-4">Severity</div>
            <p className="col-8">{this.state.bug.severity}</p>
          </div>
            
          <div className="row mb-2 border-top">
            <div className="col-4">Description</div>
            <p className="col-8">{this.state.bug.description}</p>
          </div>
          
          <div className="row mb-2">
            <div className="col-12">
              <button className=" mt-3 btn btn-secondary" data-toggle="modal" data-target="#addSolutionModal" 
                data-id="bugId0001" onClick={()=> this.setState({show:true})}> 
                <i className="far fa-edit"></i> Add solution
              </button>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-12 col-lg-12">
              <div id="tracking">
                <div className="border pl-3 text-white" style={{backgroundColor:"#7189da"}}>
                  <h3 >Bug Solutions</h3>
                </div>
                <div className="tracking-list mt-1">

                  {this.state.solutions.map((el, index) => (
                    <VerticalTimeline  key={index} >
                      <VerticalTimelineElement
                        className="vertical-timeline-element--laravel VerticalTimelineElement vertical-timeline-element "
                        contentStyle={{ background: 'rgb(64, 81, 182, 0.25)' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(64, 81, 182, 0.25)' }}
                        date={<p>{el.date.rapportDayS}, {el.date.rapportTimeS}</p>}
                        key={el.s._id}
                        icon={<img src={el.s.user_id.imageURL} className="material-icons md-18" style={{ borderRadius: "50%", position: "absolute", top: "0", left:"0"  }} width="60" height="60" alt="" />}
                        >
                        <h4 className="vertical-timeline-element-title">{el.s.user_id.firstname} {el.s.user_id.lastname}</h4>
                        <h5 className="vertical-timeline-element-subtitle">Status: {el.s.status}</h5>
                        <p>
                          {el.s.solution}
                        </p>
                      </VerticalTimelineElement>
                    </VerticalTimeline>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal className="modal fade " id="addSolutionModal" tabIndex="-1" role="dialog" show={this.state.show}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSolutionModalLabel">Edit Service</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.setState({show:false, errorMessageEdit:[], dataId:"", name:"", phone:"", email:""})}>
                <span >&times;</span>
              </button>
            </div>
            
            {this.state.errorMessage.length > 0 && (
              <div> {this.state.errorMessage.map((el, index)=> 
                (
                <Alert key={index} variant={'danger'}>{el}</Alert>
                ))} 
              </div>
            )}
            
            <form id="popup-add-solution" onSubmit={this.handleFormSubmit}>
              <div className="modal-body">
                <div className="form-group row">
                  <label htmlFor="popup-bug-solution" className="col-form-label">Status:</label>
                  <div className="col-sm-10 mt-2" onChange={this.handleChange}>
                    <input className="ml-3" type="radio" name="status" defaultChecked value="Confirmed" /><label
                      className="ml-1">Confirmed
                      </label>
                    <input className="ml-3" type="radio" name="status" value="In Progress" /><label className="ml-1">InProgress
                      </label>
                    <input className="ml-3" type="radio" name="status" value="Resolved" /><label className="ml-1">Resoveld</label>
                  </div>
                  {/* <input id="popup-service-name" name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleChange}/> */}
                </div>

                <div className="form-group row">
                  <label htmlFor="popup-bug-solution" className="col-form-label">Severity:</label>
                  <div className="col-sm-10 mt-2" onChange={this.handleChange}>
                    <input className="ml-3" type="radio" name="severity" defaultChecked value="Critical" /><label
                      className="ml-1">Critical
                      </label>
                    <input className="ml-3" type="radio" name="severity" value="High" /><label className="ml-1">High
                      </label>
                    <input className="ml-3" type="radio" name="severity" value="Medium" /><label className="ml-1">Medium</label>
                    <input className="ml-3" type="radio" name="severity" value="Low" /><label className="ml-1">Low</label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="popup-bug-solution" className="col-form-label">Solution:</label>
                  <textarea id="sol" type="text" name="solution" rows="3" className="form-control"
                  placeholder="Ex: Some solution..." onChange={this.handleChange}></textarea>
                </div>             
              </div>
              <div className="modal-footer">
                {/* <button type="reset" className="btn btn-secondary" data-dismiss="modal">Reset</button> */}
                <button type="submit" className="btn btn-primary"><i className=" mr-1 far fa-save"></i>Save</button>
              </div>
            </form>   
          </div>
        </Modal>
      </div>

    )
  }
}

