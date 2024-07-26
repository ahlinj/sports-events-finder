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
         
            <ul className="list-group">
              {this.state.organizations.map(org => (
                <li key={org.id} className="list-group-item">
                  {org.username}
                </li>
              ))}
            </ul>       
          </div>
      </div>
    )
  }
}

export default OrganizationsView