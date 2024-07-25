import React from "react";
import axios from "axios";
import { ABOUT, ADDEVENT ,EVENTS, HOME, LOGIN, ORGLOGIN, ORGSIGNUP, ORGS, SIGNUP, PRIZES } from "./Utils/Constants.js"
import HomeView from "./CustomComponents/HomeView";
import AboutView from "./CustomComponents/AboutView";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import EventsView from "./CustomComponents/EventsView";
import PrizesView from "./CustomComponents/PrizesView";
import OrganizationsView from "./CustomComponents/OrganizationsView";
import OrganizationSignUpView from "./CustomComponents/OrganizationSignUpView";
import OrganizationLoginView from "./CustomComponents/OrganizationLoginView";
import AddEventView from "./CustomComponents/AddEventView.js";



class App extends React.Component
    {

      constructor(props)
      {
        super(props);
        this.state={
          currentPage: HOME,
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
             case HOME:
               return state.userStatus.logged ? <HomeView/> : "You are not logged in"
             case ABOUT:
               return <AboutView/>
             case SIGNUP:
               return state.organizationStatus.logged ? "You are logged as an organiziation" : <SignupView/>
             case LOGIN:
               return <LoginView QUserFromChild={this.QSetUser}/>
             case EVENTS:
               return <EventsView/>
             case PRIZES:
               return <PrizesView/>
             case ORGS:
               return <OrganizationsView/>
             case ORGSIGNUP:
               return <OrganizationSignUpView/>
             case ORGLOGIN:
               return <OrganizationLoginView QUserFromChild={this.QSetOrganization}/>
             case ADDEVENT:
               return <AddEventView/>
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
                             <a onClick={()=>this.QSetView({page:HOME})} className="navbar-brand" href="#">Home</a>
                             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                               <span className="navbar-toggler-icon"></span>
                             </button>
             
                             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                 <li className="nav-item">
                                   <a onClick={()=>this.QSetView({page:ABOUT})} className="nav-link " href="#">About</a>
                                 </li>
             
                                 <li className="nav-item"> 
                                   <a onClick={()=>this.QSetView({page:SIGNUP})} className="nav-link " href="#">Signup</a>
                                 </li>
             
                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:LOGIN})} className="nav-link "  href="#">Login</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:EVENTS})} className="nav-link "  href="#">Events</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:PRIZES})} className="nav-link "  href="#">Prizes</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:ORGS})} className="nav-link "  href="#">Organizations</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:ORGSIGNUP})} className="nav-link "  href="#">Organization Signup</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:ORGLOGIN})} className="nav-link "  href="#">Organization Login</a>
                                 </li>

                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:ADDEVENT})} className="nav-link "  href="#">Add event</a>
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