import React, { Component } from 'react'
import Popin from '../Popin.js';
import service from '../api/service';
import { Redirect } from 'react-router-dom';


export default class Dashboard extends Component {

  logout = (event) => {
    service.logout()
      .then(response => {
        this.props.updateUser(false);
      })
    ;
  }

  // handelUpload=(event) =>{
  //   let uploadData = new FormData();
  //   uploadData.append('imageURL', event.target.files[0]);
  //   service.upload(uploadData)
  //   .then(response =>{
  //     this.props.updateUser(response);
  //   })
    
  // ;
  // }

  render() {
    return (
      <>
        {!this.props.user._id ? (
          <Redirect to="/" />
        ) : (
          <Popin  key={this.props.user._id} one={(
            <>
              <div className="cta">
                <button className="btn logout" onClick={this.logout}>Logout</button>
              </div>
            </>
          )} two={(
            <>
              hello
            </>
          )} />
        )}
      </>
    )
  }
}
