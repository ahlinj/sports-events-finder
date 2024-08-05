import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class TokensView extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            totalTokens: ''
        }
      }

      componentDidMount() {
        this.fetchTokenTotal();
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


    render()
    {
      return(
      <div className="card" style={{ width: "80%", margin: "20px auto", border: "none"}}>
        <div className="card" style={{margin:"10px"}}>
          <h2 className="card-header">Tokens</h2>
        </div>
        <div className="card" style={{margin:"10px"}}>
          <h6 className="card-header">My tokens</h6>
          <p style={{margin:"10px"}}>
            {this.state.totalTokens}
          </p >
        </div>
        

      </div> 
      )
    }
}

export default TokensView