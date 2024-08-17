import React from 'react'

class AboutView extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{margin:"10px"}}>
    <div className="card-body">
      <h5 className="card-title">About us</h5>
      <p className="card-text">This is a sports events finder website, that gives you an easy to understand user interface to find sports events of your choice.
        If you own an organization and would like to promote your sports events please sign up and you can promote your events for free.
        Consider also providing a prize to our users. Users are free to join any events without any fees, only requiring to sign up. 
        By joining events you will be able to collect tokens of different value and the most active user will receive this months sponzor prizes.
      </p>
    </div>
  </div>
    )
  }
}

export default AboutView