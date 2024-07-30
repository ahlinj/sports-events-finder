import React from 'react'
import {ORGLOGIN,LOGIN, SIGNUP, ORGSIGNUP} from "../Utils/Constants.js"

class NotLoggedInView extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{margin:"10px"}}>
      <div className="card-body">
        <h5 className="card-title">Welcome!!!</h5>
      </div>
      <div className="card" style={{margin:"10px"}}>
        <p className="card-text">Please login to view this page.</p>
        <p>
            Click <a onClick={() => this.props.setView({ page: LOGIN })} href="#" >here</a> to login as user.
        </p>
        
        <p>
            Click <a onClick={() => this.props.setView({ page: ORGLOGIN })} href="#" >here</a> to login as organization.
        </p>
      </div>
      <div className="card" style={{margin:"10px"}}>
        <p className="card-text">If you don't have an account please signup.</p>
        <p>
            Click <a onClick={() => this.props.setView({ page: SIGNUP })} href="#" >here</a> to signup as user.
        </p>
        
        <p>
            Click <a onClick={() => this.props.setView({ page: ORGSIGNUP })} href="#" >here</a> to signup as organization.
        </p>
      </div>
    </div> 
    )
  }
}

export default NotLoggedInView