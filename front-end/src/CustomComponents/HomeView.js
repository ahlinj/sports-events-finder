import React from 'react'

class HomeView extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{margin:"10px"}}>
      <div className="card-body">
        <h5 className="card-title">Welcome!</h5>
        <p className="card-text">Consider signing up to our website to access all of our features.</p>
      </div>
    </div> 
    )
  }
}

export default HomeView