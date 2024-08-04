import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class ProfileViewOrg extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            orgData: ''
        }
      }

      componentDidMount() {
        this.fetchOrganization();
      }
          

    fetchOrganization = () => {
        axios.post(API_URL+'/organizations/get',{
            name:this.props.organization
          })
          .then(res=>{
            console.log("Received from server...", res.data);
            this.setState({ orgData: res.data });
          })
          .catch(err=>{
            console.log(err)
          })
      }

    


    render()
    {
      return(
      <div className="card" style={{ width: "80%", margin: "20px auto", border: "none"}}>
        <div className="card" style={{margin:"10px"}}>
          <h2 className="card-header">Profile</h2>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Username</h6>
          <p style={{margin:"10px"}}>
            {this.props.organization}
          </p >
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Name</h6>
          <p style={{margin:"10px"}}>
            {this.state.orgData.ime}
          </p>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Address</h6>
          <p style={{margin:"10px"}}>
          {this.state.orgData.naslov}
          </p>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Email</h6>
          <p style={{margin:"10px"}}>
          {this.state.orgData.eposta}
          </p>
        </div>

      </div> 
      )
    }
}

export default ProfileViewOrg