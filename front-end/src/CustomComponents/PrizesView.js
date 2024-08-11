import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class PrizesView extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      tokens: [],
      prizes: []
    }
  }

  componentDidMount() {
    this.fetchTokens()
    this.fetchPrizes()
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

  fetchPrizes = () => {
    axios.get(API_URL+'/prizes/get')
      .then(res => {
        this.setState({
          prizes: res.data
        });
      })
      .catch(error => {
        console.error(error)
      })
  }



  render()
  {
    return(
      <>
      <div className="card" style={{ width: "80%", margin: "20px auto" }}>
        <h2 className="card-header">Current available prizes</h2>
        <div className="card-body">
           
            <table className="table">
              <thead>
                <tr>
                  <th>Sponsor</th>
                  <th>Publication date</th>
                  <th>Value in €</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prizes.map(prz => (
                  <tr>
                    <td>{prz.sponzor}</td>
                    <td>{formatDateTime(prz.datumObjave)}</td>
                    <td>{prz.vsota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      <div className="card" style={{ width: "80%", margin: "20px auto" }}>
        <h2 className="card-header">Current tokens leaderboard</h2>
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
      </>
    )
  }
}


function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default PrizesView