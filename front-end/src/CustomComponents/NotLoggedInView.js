import React from 'react'
import {ORGLOGIN,LOGIN, SIGNUP, ORGSIGNUP} from "../Utils/Constants.js"

class NotLoggedInView extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{ width: "80%", margin: "20px auto", border: "none"}}>
      <div className="card" style={{margin:"10px"}}>
        <h2 className="card-header">Welcome</h2>
      </div>
      <div className="card" style={{margin:"10px"}}>
        <h6 className="card-header">Please login to view this page.</h6>
        <p style={{margin:"10px"}}>
            Click <a onClick={() => this.props.setView({ page: LOGIN })} href="#" >here</a> to login as user.
        </p >
        
        <p style={{margin:"10px"}}>
            Click <a onClick={() => this.props.setView({ page: ORGLOGIN })} href="#" >here</a> to login as organization.
        </p>
      </div>
      <div className="card" style={{margin:"10px"}}>
        <h6 className="card-header">If you don't have an account please signup.</h6>
        <p style={{margin:"10px"}}>
            Click <a onClick={() => this.props.setView({ page: SIGNUP })} href="#" >here</a> to signup as user.
        </p>
        
        <p style={{margin:"10px"}}>
            Click <a onClick={() => this.props.setView({ page: ORGSIGNUP })} href="#" >here</a> to signup as organization.
        </p>
      </div>
    </div> 
    )
  }
}

export default NotLoggedInView