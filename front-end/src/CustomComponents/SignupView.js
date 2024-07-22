import React from 'react'
import axios from "axios"

class SignupView extends React.Component
{

    constructor(props){
        super(props)
        this.state={
            user:{
                type:"signup"
            }
        }
    }

    QGetTextFromField = (e) => {
        this.setState(prevState=>({
            user:{...prevState.user,[e.target.name]:e.target.value}
        }))
    }


    QPostSignup=()=>{
        axios.post('http://88.200.63.148:5000/users/register',{
          name:this.state.user.name,
          surname:this.state.user.surname,
          password:this.state.user.password,
          private:this.state.user.private,
          gender:this.state.user.gender,
          age:this.state.user.age,
          email:this.state.user.email,
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
    <label className="form-label">Name</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Surname</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="surname" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Private</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="private" type="text" className="form-control" id="exampleInputEmail11"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Gender</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="gender" type="text" className="form-control" id="exampleInputEmail1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input onChange={(e)=>this.QGetTextFromField(e)} name="age" type="text" className="form-control" id="exampleInputEmail1"/>
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

export default SignupView