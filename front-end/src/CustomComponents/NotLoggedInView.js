import React from 'react'

class NotLoggedInView extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{margin:"10px"}}>
      <div className="card-body">
        <h5 className="card-title">Welcome!!!</h5>
        <p className="card-text">Please login to view this page</p>
      </div>
    </div> 
    )
  }
}

export default NotLoggedInView