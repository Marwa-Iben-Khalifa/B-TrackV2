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
      <Container fluid >
        <Navbar user={this.props.user} updateUser={this.props.updateUser}/>
        <Container fluid style={{textAlign:"left" ,marginBottom:"60px", height:"100%" , color: "#300032", fontWeight:"bolder"}}>
          <div >
            <Card
              bg="ligth"
              text={'black'}
              // style={{ width: '40rem' }}
              className="mb-2"
              >
              <Card.Header>Charts</Card.Header>
              <Card.Body>
                <Polar   height={100}
                  data={this.state.dataByStatus}
                  options={{
                    title:{
                      display:false,
                      text:'Chart By Status',
                      fontSize:16
                    },
                    legend:{
                      display:true,
                      position:'left'
                    },
                  }}
                />
  
                <Polar   height={100}
                  data={this.state.dataBySeverity}
                  options={{
                    title:{
                      display:false,
                      text:'Chart By Status',
                      fontSize:16
                    },
                    legend:{
                      display:true,
                      position:'left'
                    },
                  }}
                />
              </Card.Body>
            </Card>
            <Card
              bg="ligth"
              text={'black'}
              style={{ width: '20rem' }}
              className="mb-2"
              >
              <Card.Header>{this.state.priorityBugs.length} Critical Bugs</Card.Header>
              <Card.Body>
                <Card.Title>{this.state.priorityBugs.map((el)=>(
                  <ul key={el._id}>
                    <li >
                      <i style={{color:"red"}} className="fas fa-exclamation-triangle"></i>
                      <Link to={`/${el._id}/bug-details`} style={{color: "black"}}>{el.title}</Link>
                    </li>
                  </ul>
                  ))} 
                </Card.Title>
              </Card.Body>
            </Card>
          </div> 
        </Container>
        <Footer/>
        
      </Container>          
    )
  }
}
