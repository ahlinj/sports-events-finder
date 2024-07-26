import React from 'react'
import axios from "axios"
import { API_URL } from "../Utils/Configuration.js"

class AddEventView extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            event:{
                name: '',
                description: '',
                location: '',
                dateTime: '',
            }
        }
    }

    QGetTextFromField=(e)=>{
        this.setState(prevState=>({
            event:{...prevState.event,[e.target.name]:e.target.value}
          }))
      }
    

    QPostSignup=()=>{
        axios.post(API_URL+'/events',{
          name:this.state.event.name,
          description:this.state.event.description,
          location:this.state.event.location,
          dateTime:this.state.event.dateTime,
          organization:this.props.organization
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
<div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
<form style={{margin:"20px"}} >
  <div className="mb-3">
    <label className="form-label">Event name</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Description</label>
    <textarea onChange={(e)=>this.QGetTextFromField(e)} name="description" type="text" className="form-control" id="exampleInputEmail1" rows="4"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Location</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="location" type="text" className="form-control" id="exampleInputEmail1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Date and time</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="dateTime" type="datetime-local" className="form-control" id="exampleInputEmail1"/>
  </div>
</form>
<button onClick={()=>this.QPostSignup()} style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
</div>
    )
  }
}

export default AddEventView