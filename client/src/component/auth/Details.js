import React, { Component } from 'react'
import { Link , Redirect} from 'react-router-dom';


export default class Details extends React.Component  {
  constructor(props){
      super(props);
      this.state = { 
      }
  }

  render() {
    return (
      <>
        <div class="row d-flex justify-content-around"  >
          <div style={{marginTop:"50px"}}>
            <div class="rounded-circle" >
              <div class="card-body">
                <h5 class="card-title" style={{fontWeight:"bold"}}>what is B-Track ? </h5>
                <p class="card-text" >With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn" style={{backgroundColor:"#3f51b552", borderRadius:"10px", fontWeight:"bold"}}>Learn more</a>
              </div>
            </div>
          </div>
          <div> 
            <div class="rounded-circle" style={{marginTop:"50px"}}>
              <div class="card-body">
                <h5 class="card-title" style={{fontWeight:"bold"}}>How does it work?</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn" style={{backgroundColor:"#3f51b552", borderRadius:"10px", fontWeight:"bold"}}>Learn more</a>
              </div>
            </div>
          </div>
          <div>
            <div class="rounded-circle" style={{marginTop:"50px"}}>
              <div class="card-body">
                <h5 class="card-title" style={{fontWeight:"bold"}}>About us</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn" style={{backgroundColor:"#3f51b552", borderRadius:"10px", fontWeight:"bold"}}>Learn more</a>
              </div>
            </div>
          </div>
        </div>

      </>
      )}







}