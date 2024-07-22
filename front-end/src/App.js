import React from "react";
import HomeView from "./CustomComponents/HomeView";
import AboutView from "./CustomComponents/AboutView";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";



class App extends React.Component
    {

      constructor(props)
      {
        super(props);
        this.state={
          CurrentPage: "none"
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
               return <HomeView/> 
             case "about":
               return <AboutView/>
             case "signup":
               return <SignupView QUserFromChild={this.QHandleUserLog}/>
             case "login":
               return <LoginView QUserFromChild={this.QHandleUserLog}/>
           }
        }
       

        QHandleUserLog = (obj) => {
          this.QSetView({page:"home"})
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
                                   <a onClick={()=>this.QSetView({page:"signup"})} className="nav-link " href="#">Sign up</a>
                                 </li>
             
                                 <li className="nav-item" >
                                   <a onClick={()=>this.QSetView({page:"login"})} className="nav-link "  href="#">Login</a>
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