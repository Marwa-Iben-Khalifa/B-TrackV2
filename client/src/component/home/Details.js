import React, { Component } from 'react'
import { Link , Redirect} from 'react-router-dom';
import {Container, Button, Spinner, Row, Col, Table, Card, Modal} from 'react-bootstrap'

export default class Details extends React.Component  {
  state={
    show1:false,
    show2:false
  }

  handleClose=(event)=>{
    this.setState({show1:false, show2:false})
  }
  
  render() {
    return (
      <Container fluid style={{textAlign:"center"}}>
        <Row className="d-flex justify-content-around"  >  
          <div style={{marginTop:"50px"}}>
            <div>
              <Card.Body >
                <Card.Title style={{fontWeight:"bold"}}>B-Track ? </Card.Title>
                <Card.Text >B-track is a software tool to report and monitor bugs in a given company.</Card.Text>
                <a href="#" className="btn" style={{backgroundColor:"#3f51b552", borderRadius:"10px", fontWeight:"bold"}} onClick={()=> this.setState({show1:true})}>Learn more</a>
              </Card.Body>
            </div>
          </div>
          
          <div style={{marginTop:"50px"}}> 
            <div>
              <Card.Body>
                <Card.Title style={{fontWeight:"bold"}}>How?</Card.Title>
                <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                <a href="#" className="btn" style={{backgroundColor:"#3f51b552", borderRadius:"10px", fontWeight:"bold"}} onClick={()=> this.setState({show2:true})}>Learn more</a>
              </Card.Body>
            </div>
          </div>

          <div style={{marginTop:"50px"}}>
            <div>
              <Card.Body>
                <Card.Title style={{fontWeight:"bold"}}>About Us?</Card.Title>
                <Card.Text>Two IRONHACK's Alumni graduated in December 2020.</Card.Text>
                <Link to='/aboutUs' className="btn" style={{backgroundColor:"#3f51b552", borderRadius:"10px", fontWeight:"bold"}}>Learn more</Link>
              </Card.Body>
            </div>
          </div>

        </Row>
        <Modal show={this.state.show1} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Wath is B-Track?</Modal.Title>
          </Modal.Header>
          <Modal.Body>As its name can imply, B-Track, for bug tracking, is a software tool to report and monitor bugs in a given company. It allows employees to declare all kinds of bugs, to assign them to the relevant service and to monitor their progression in a very collaborative manner.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.show2} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>How B-Track works?</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    )
  }
}