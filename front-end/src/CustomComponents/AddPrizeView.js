import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class AddPrizeView extends React.Component
{
  constructor(props){
    super(props)
    this.state={
        prize:{
            value: ''
        }
    }
}

QGetTextFromField=(e)=>{
    this.setState(prevState=>({
        prize:{...prevState.prize,[e.target.name]:e.target.value}
      }))
  }


QPostSignup=()=>{
    console.log(this.state.prize.value)
    axios.post(API_URL+'/prizes/add',{
      value:this.state.prize.value,
      sponsor:this.props.organization,
    })
    .then(response=>{
      console.log("Sent to server...")
    })
    .catch(err=>{
      console.log(err)
    })
  }
  

render()
{
return(
  <>
  <div className="card" style={{margin:"10px"}}>
    <div className="card-body">
      <h5 className="card-title">Add prize</h5>
      <p className="card-text">By entering the prize value in € in the form below and submitting it you agree to provide the written amount to the winner.</p>
    </div>
  </div>
<div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
<form style={{margin:"20px"}} >
<div className="mb-3">
<label className="form-label">Value in €</label>
<input onChange={(e)=>this.QGetTextFromField(e)} name="value" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
</div>
</form>
<button onClick={()=>this.QPostSignup()} style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
</div>
</>
)
}
}


export default AddPrizeView