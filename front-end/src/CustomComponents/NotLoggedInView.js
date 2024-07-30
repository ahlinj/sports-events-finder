import React from 'react'
import {ORGLOGIN,LOGIN} from "../Utils/Constants.js"

class NotLoggedInView extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{margin:"10px"}}>
      <div className="card-body">
        <h5 className="card-title">Welcome!!!</h5>
        <p className="card-text">Please login to view this page.</p>
        <p>
            Click <a onClick={() => this.props.setView({ page: LOGIN })} href="#" >here</a> to login as user.
        </p>
        
        <p>
            Click <a onClick={() => this.props.setView({ page: ORGLOGIN })} href="#" >here</a> to login as organization.
        </p>
      </div>
    </div> 
    )
  }
}

export default NotLoggedInView