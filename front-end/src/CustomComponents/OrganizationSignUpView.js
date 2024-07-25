import React from 'react'
import axios from "axios"

class OrganizationSignUpView extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            organization:{
                type:"organization-signup",
            }
        }
    }

    QGetTextFromField=(e)=>{
        this.setState(prevState=>({
            organization:{...prevState.organization,[e.target.name]:e.target.value}
          }))
      }
    

    QPostSignup=()=>{
        axios.post('http://88.200.63.148:5000/organizations/register',{
          username:this.state.organization.username,
          name:this.state.organization.name,
          password:this.state.organization.password,
          address:this.state.organization.address,
          email:this.state.organization.email,
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
    <label className="form-label">Username</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Address</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="address" type="text" className="form-control" id="exampleInputEmail1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
    </div>
  </div>
</form>
<button onClick={()=>this.QPostSignup()} style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
</div>
    )
  }
}

export default OrganizationSignUpView