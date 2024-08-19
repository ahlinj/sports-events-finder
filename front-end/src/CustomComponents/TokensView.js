import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class TokensView extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            totalTokens: '',
            tokens: []
        }
      }

      componentDidMount() {
        this.fetchTokenTotal()
        this.fetchAllTokensByPerson()
      }
          

    fetchTokenTotal = () => {
        axios.post(API_URL+'/tokens',{
            name:this.props.user
          })
          .then(res=>{
            console.log("Received from server...", res.data);
            if (res.data[0].total_vrednost != null ){
                this.setState({totalTokens:res.data[0].total_vrednost})
            }else{
                this.setState({totalTokens:'0'})
            }
          })
          .catch(err=>{
            console.log(err)
          })
      }

      fetchAllTokensByPerson = () => {
        axios.post(API_URL+'/tokens/all',{
            name:this.props.user
          })
          .then(res=>{
            console.log("Received all tokens from server...", res.data);
            this.setState({
                tokens: res.data
              })
          })
          .catch(err=>{
            console.log(err)
          })
      }

    render()
    {
      return(
      <div className="card" style={{ width: "80%", margin: "20px auto"}}>
        <div className="card" style={{margin:"10px"}}>
          <h2 className="card-header">Tokens</h2>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">This month's token count</h6>
          <p style={{margin:"10px"}}>
            {this.state.totalTokens}
          </p >
        </div>
        <table className="table" >
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date Received</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
              {this.state.tokens.map(tok => {
                return (
                  <tr key={tok.id}>
                    <td>{tok.dogodekIme}</td>
                    <td>{formatDateTime(tok.datumPrejetja)}</td>
                    <td>{tok.vrednost}</td>
                  </tr>
                )
              })}
            </tbody>
            </table>
        

      </div> 
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

export default TokensView