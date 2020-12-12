import React, { Component } from 'react'
import axios from 'axios';
import service from '../api/service';
import { Redirect, Link } from 'react-router-dom';
import {Container, Button, Spinner, Row, Col, Table, Card} from 'react-bootstrap'
import Navbar from "../navBar/Navbar"
import Footer from '../navBar/Footer'
import {Pie, Doughnut, Polar} from 'react-chartjs-2';


export default class Dashboard extends Component {
  state={
    priorityBugs:null,
    dataByStatus:{labels: [],
                  datasets: [
                    {
                      label: '',
                      backgroundColor: [],
                      hoverBackgroundColor: [],
                      data: []
      }
    ]},
    dataBySeverity:{labels: [],
                  datasets: [
                    {
                      label: '',
                      backgroundColor: [],
                      hoverBackgroundColor: [],
                      data: []
      }
    ]},
    
  }

  componentDidMount() {
    this.getDataByStatus();
    this.getDataBySeverity();
    this.getPriorityBugs();
  }

  getPriorityBugs = () =>{
    axios.get(`http://localhost:3001/api/priority`)
    .then(responseFromApi => {
      this.setState({priorityBugs: responseFromApi.data.result})
    })
  }

  getDataByStatus = () =>{
    axios.get(`http://localhost:3001/api/repportByStatus`)
    .then(responseFromApi => {
      this.setState({dataByStatus:{
        labels: responseFromApi.data.bugs.bugTypes,
        datasets: [{label: 'Status',
                    backgroundColor: [
                      '#FF6699',
                      '#FF9933',
                      '#CCFF33'
                    ],
                    hoverBackgroundColor: [
                    '#CC3366',
                    '#FF6633',
                    '#99CC33'
                    ],
                    data: responseFromApi.data.bugs.countByType}]}
      })
    })
  }
  
  getDataBySeverity = () =>{
    axios.get(`http://localhost:3001/api/repportBySeverity`)
    .then(responseFromApi => {
      this.setState({dataBySeverity:{
        labels: responseFromApi.data.bugs.bugTypes,
        datasets: [{label: 'Severity',
                    backgroundColor: [
                      '#FF4040',
                      '#FF6699',
                      '#FF9933',
                      '#CCFF33'
                    ],
                    hoverBackgroundColor: [
                    '#FF0033',
                    '#CC3366',
                    '#FF6633',
                    '#99CC33'
                    ],
                    data: responseFromApi.data.bugs.countByType}]}
      })
    })
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

  render() {
    if (this.state.dataByStatus.labels.length === 0 || this.state.dataByStatus.labels.length === 0 || this.state.priorityBugs=== null) return this.showContainer()
    console.log("State", this.state)
    return (
      // <>
      //   {!this.props.user._id ? (
      //     <Redirect to="/" />
      //   ) : (
          
            <Container fluid >
              <Navbar user={this.props.user} updateUser={this.props.updateUser}/>
              <Container fluid style={{marginBottom:"60px", height:"100%" , color: "#300032", fontWeight:"bolder"}}>
                <Card
                  bg="danger"
                  text={'white'}
                  style={{ width: '20rem' }}
                  className="mb-2"
                >
                  <Card.Header>{this.state.priorityBugs.length+1} Critical Bugs</Card.Header>
                  <Card.Body>
                    <Card.Title>{this.state.priorityBugs.map((el)=>(
                          <tr key={el._id}>
                            <td>{el.title}</td>
                            <td >
                              <Link to={`/${el._id}/bug-details`}><Button  variant="warning">Go</Button></Link>
                            </td>
                          </tr>
                        ))} </Card.Title>
                  </Card.Body>
                      </Card>
                        {/* <div className="row"> */}
                          {/* <div className="col align-self-center"> */}
                          <Card
                            bg="ligth"
                            text={'black'}
                            // style={{ width: '40rem' }}
                            className="mb-2"
                          >
                            <Card.Header>Chart By Status</Card.Header>
                            <Card.Body>
                              <Card.Title>
                                <Polar   
                                  data={this.state.dataByStatus}
                                  options={{
                                    title:{
                                      display:false,
                                      // text:'Chart By Status',
                                      // fontSize:16
                                    },
                                    legend:{
                                      display:true,
                                      position:'top'
                                    },
                                  }}
                                />
                              </Card.Title>
                            </Card.Body>
                          </Card>
                      
                    {/* </div> */}
                    {/* <div className="col align-self-center"> */}
                          <Card
                            bg="ligth"
                            text={'black'}
                            // style={{ width: '40rem' }}
                            className="mb-2"
                          >
                            <Card.Header>Chart By Status</Card.Header>
                            <Card.Body>
                              <Card.Title>
                                <Polar   
                                  data={this.state.dataBySeverity}
                                  options={{
                                    title:{
                                      display:false,
                                      // text:'Chart By Status',
                                      // fontSize:16
                                    },
                                    legend:{
                                      display:true,
                                      position:'top'
                                    },
                                  }}
                                />
                              </Card.Title>
                            </Card.Body>
                          </Card>
                      {/* <Polar  height={150}
                        data={this.state.dataBySeverity}
                        options={{
                          title:{
                            display:true,
                            text:'Chart By Severity',
                            fontSize:20
                          },
                          legend:{
                            display:true,
                            position:'top'
                          }
                        }}
                      /> */}
                    {/* </div> */}
                  {/* </div> */}
                  <div className=" col-sm-6 ">
                    <Table striped bordered hover responsive="sm">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Title</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.priorityBugs.map((el)=>(
                          <tr key={el._id}>
                            <td>🔴</td>
                            <td>{el.title}</td>
                            <td className="d-flux">
                              <Link to={`/${el._id}/bug-details`}><Button  variant="info"><i className="fas fa-eye"></i></Button></Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div> 
              </Container>
              <Footer/>
              
            </Container>
          
        )}
    //   </>
    // )
  // }
}
