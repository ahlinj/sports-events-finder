import React from 'react'
import axios from 'axios'
import { API_URL } from "../Utils/Configuration.js"

class OrganizationLoginView extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            organization:{
                type:"organization-login"
            }
        }
    }

    QGetTextFromField = (e) => {
        this.setState(prevState=>({
            organization:{...prevState.organization,[e.target.name]:e.target.value}
        }))
    }

    QSendUserToParent = (obj) => {
        this.props.QUserFromChild(obj)
    }

    QPostLogin=()=>{
        let organization = this.state.organization
        axios.post(API_URL+'/organizations/login',{
          username:organization.username,
          password:organization.password
        },{withCredentials:true})
        .then(res=>{
            console.log("Sent to server...")
            console.log(res.data)
            this.QSendUserToParent(res.data)
        })
      }    
  


  render()
  {
    return(
    <div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
    <form style={{margin:"20px"}} >
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input onChange={(e)=>this.QGetTextFromField(e)} name="username"  type="text" className="form-control" id="exampleInputEmail1"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input onChange={(e)=>this.QGetTextFromField(e)} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
      </div>
    </form>
    <button onClick={()=>this.QPostLogin()} style={{margin:"10px"}} className="btn btn-primary bt">Log in</button>
  </div>
    )
  }
}

export default OrganizationLoginView