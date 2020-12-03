import React, { Component } from 'react'
import service from '../api/service';
import { Link, Redirect } from 'react-router-dom';


export default class BugsList extends Component {
  state={
    bugs:[]
  };
  
  getBugsFromApi = () =>{
    service.service.get(`/display-bugs`)
    
    .then(response => {
      this.setState({
        bugs: response.data
      })
    })
  }

  componentDidMount() {
    this.getBugsFromApi();
  }
  render() {
    console.log(this.state.bugs)
    return (
      <div>
        <h2>Bug list</h2>
        <div className="table-responsive">
          <table className="table table-striped  table-hover table-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Rapporter</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bugs.map((el)=>(
                <tr key={el.bug._id}>
                  <td>{el.bug.title}</td>
                  <td>{el.bug.rapporter.firstname} {el.bug.rapporter.lastname}
                    <small className="text-secondary form-text text-muted mt-0"> {el.bug.rapporter.email}</small>
                    <small className="text-secondary form-text text-muted mt-0">{el.rapportedAt.rapportDay} at
                      {el.rapportedAt.rapportTime}</small>
                  </td>
                  <td>{el.bug.severity}</td>
                  <td>{el.bug.status}</td>
                  <td className="d-flux">
                    <a href="/dashboard/{el.bug._id}/delete"><button className="btn btn-danger"><i
                      className="fas fa-trash-alt"></i></button></a>
                    <Link to={`/${el.bug._id}/bug-details`}><button className=" btn btn-info"><i className="fas fa-eye"></i></button></Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
