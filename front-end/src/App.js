import React from "react";
import axios from "axios";
import HomeView from "./CustomComponents/HomeView";
import AboutView from "./CustomComponents/AboutView";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import EventsView from "./CustomComponents/EventsView";
import PrizesView from "./CustomComponents/PrizesView";
import OrganizationsView from "./CustomComponents/OrganizationsView";
import OrganizationSignUpView from "./CustomComponents/OrganizationSignUpView";
import OrganizationLoginView from "./CustomComponents/OrganizationLoginView";



class App extends React.Component
    {

      constructor(props)
      {
        super(props);
        this.state={
          currentPage: "none",
          userStatus:{logged:false},
          organizationStatus:{logged:false}
        }
      } 

      QSetView=(obj)=>{
        this.setState({
          CurrentPage: obj.page
        })
      }

      QGetView=(state)=>
        {
          let page = state.CurrentPage
       
           switch(page)
           {  
             case "home":
               return state.userStatus.logged ? <HomeView/> : "You are not logged in"
             case "about":
               return <AboutView/>
             case "signup":
               return state.organizationStatus.logged ? "You are logged as an organiziation" : <SignupView/>
             case "login":
               return <LoginView QUserFromChild={this.QSetUser}/>
             case "events":
               return <EventsView/>
             case "prizes":
               return <PrizesView/>
             case "organizations":
               return <OrganizationsView/>
             case "organizationSignUp":
               return <OrganizationSignUpView/>
             case "organizationLogIn":
               return <OrganizationLoginView QUserFromChild={this.QSetOrganization}/>
           }
        }
       

        QSetUser = (obj) => {
          this.setState({
            userStatus: {logged:true,user:obj}
          })
        }

        QSetOrganization = (obj) => {
          this.setState({
            organizationStatus:{logged:true,organization:obj}
          })
        }

        render()
        {
            return(

              <div id="APP" className="container">
             
                     <div id="menu" className="row">
                       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                           <div className="container-fluid">
                             <a onClick={()=>this.QSetView({page:"home"})} className="navbar-brand" href="#">Home</a>
                             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                               <span className="navbar-toggler-icon"></span>
                             </button>
             
                             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                 <li className="nav-item">
                                   <a onClick={()=>this.QSetView({page:"about"})} className="nav-link " href="#">About</a>
                                 </li>
             
                                 <li className="nav-item"> 
                                   <a onClick={()=>this.QSetView({page:"signup"})} className="nav-link " href="#">Signup</a>
                                 </li>
             
                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:"login"})} className="nav-link "  href="#">Login</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:"events"})} className="nav-link "  href="#">Events</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:"prizes"})} className="nav-link "  href="#">Prizes</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:"organizations"})} className="nav-link "  href="#">Organizations</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:"organizationSignUp"})} className="nav-link "  href="#">Organization Signup</a>
                                 </li>
                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:"organizationLogIn"})} className="nav-link "  href="#">Organization Login</a>
                                 </li>
                               </ul>
                             </div>
                           </div>
                         </nav>
                     </div>
             
                     <div id="viewer" className="row container">
                      {this.QGetView(this.state)}
                        

                     </div>
             
                 </div>
             
             )
             
        }
    }

    export default App