import React from 'react'
import axios from 'axios'
import { API_URL } from "../Utils/Configuration"

class OrganizationsView extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      organizations: []
    };
  }
  componentDidMount() {
    this.fetchOrganizations();
  }

  fetchOrganizations = () => {
    axios.get(API_URL+'/organizations')
      .then(res => {
        this.setState({
          organizations: res.data
        });
      })
      .catch(error => {
        console.error(error)
      })
  }


  render()
  {
    return(
      <div className="card" style={{ width: "80%", margin: "20px auto" }}>
        <h2 className="card-header">Organizations</h2>
        <div className="card-body">
           
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.organizations.map(org => (
                  <tr>
                    <td>{org.username}</td>
                    <td>{org.ime}</td>
                    <td>{org.naslov}</td>
                    <td>{org.eposta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default OrganizationsView