import React, { Component } from 'react'
import {Container} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../navs/Navbar'
import Footer from '../navs/Footer'

export default class AboutUs extends Component {
  render() {
    return (
      <Container fluid id="aboutUS">
        <Navbar user={this.props.user} updateUser={this.props.updateUser} history={this.props.history}/>
        <Container className="border" style={{fontWeight:"bolder", marginBottom:"60px" }}>
        <div className="marwa-and-wafaa">
          <div className="marwa">
            <div>
              <div>
                <img src='https://res.cloudinary.com/dshuazgaz/image/upload/v1608214672/20190322_120552-01_2_pnzqqh.jpg'
                  alt='img' style={{ height: "300px", borderRadius: "50%" }} />
              </div>
              <h3 className=''>IBEN KHALIFA Marwa</h3>
              <hr />
              <h4>We will either find a way, or make one</h4>
              <span>{' -HANNIBAL '}</span>
              <a href='https://www.linkedin.com/in/marwa-iben-khalifa-4599a2153/'>
                <h5><i className="fab fa-linkedin fa-lg"></i>www.linkedin.com/in/marwa-iben-khalifa</h5>
              </a>
              <a href='https://github.com/Marwa-Iben-Khalifa'>
                <h5><i className="fab fa-github-square fa-lg"></i>www.github.com/Marwa-Iben-Khalifa</h5>
              </a>
            </div>
          </div>
          <div className="wafaa">
            <div>
              <div>
                <img src='https://res.cloudinary.com/dshuazgaz/image/upload/v1608214634/WhatsApp_Image_2020-12-15_at_21.46.03_e7seqn.jpg'
                  alt='img' style={{ height: "300px", borderRadius: "50%" }} />
              </div>
              <h3 className=''>LEKMITI Wafâa</h3>
              <hr />
              <h4>Life is either a daring adventure or nothing</h4>
              <span>{' -HELEN KELLER '}</span>              <a href='https://www.linkedin.com/in/marwa-iben-khalifa-4599a2153/'>
                <h5><i className="fab fa-linkedin fa-lg"></i>www.linkedin.com/in/marwa-iben-khalifa</h5>
              </a>
              <a href='https://github.com/Marwa-Iben-Khalifa'>
                <h5><i className="fab fa-github-square fa-lg"></i>www.github.com/Marwa-Iben-Khalifa</h5>
              </a>
            </div>
          </div>
        </div>

          
        </Container>
        <Footer/>
      </Container>
    )
  }
}
