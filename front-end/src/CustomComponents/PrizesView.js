import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class PrizesView extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      tokens: []
    }
  }

  componentDidMount() {
    this.fetchTokens();
  }

  fetchTokens = () => {
    axios.get(API_URL+'/prizes')
      .then(res => {
        this.setState({
          tokens: res.data
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
        <h2 className="card-header">Current leaderboard</h2>
        <div className="card-body">
           
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Total tokens</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tokens.map(tok => (
                  <tr>
                    <td>{tok.username}</td>
                    <td>{tok.total_vrednost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default PrizesView