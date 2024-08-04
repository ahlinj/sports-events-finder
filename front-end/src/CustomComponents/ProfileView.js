import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class ProfileView extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            userData: ''
        }
      }

      componentDidMount() {
        this.fetchUser();
      }
          

    fetchUser = () => {
        axios.post(API_URL+'/users/get',{
            name:this.props.user
          })
          .then(res=>{
            console.log("Received from server...", res.data);
            this.setState({ userData: res.data });
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
            {this.props.user}
          </p >
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Name</h6>
          <p style={{margin:"10px"}}>
            {this.state.userData.ime}
          </p>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Surname</h6>
          <p style={{margin:"10px"}}>
          {this.state.userData.priimek}
          </p>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Private</h6>
          <p style={{margin:"10px"}}>
          {this.state.userData.privat == 1 ? "Yes" : "No"}
          </p>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Gender</h6>
          <p style={{margin:"10px"}}>
          {this.state.userData.spol}
          </p>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Age</h6>
          <p style={{margin:"10px"}}>
          {this.state.userData.starost}
          </p>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">Email</h6>
          <p style={{margin:"10px"}}>
          {this.state.userData.eposta}
          </p>
        </div>

      </div> 
      )
    }
}

export default ProfileView