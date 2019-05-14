import React, { Component } from "react"
import "./App.css"
import { Route, Switch, Link } from "react-router-dom"
import { Loader,Dimmer, Modal } from 'semantic-ui-react'

import Landing from "./Components/Landing"
import Login from "./Components/Login"
import CardDetails from "./Components/CardDetails"
import Cart from "./Components/Cart"
import CardImage from "./Components/CardImage"
import AboutUs from "./MenuPages/AboutUs"
import Services from "./MenuPages/Services"
import ContactUs from "./MenuPages/ContactUs"

class App extends Component {

  state = {
    userInfo:[],
    isLoading:true,
  }

 componentDidMount(){

    let rememberMe=localStorage.getItem("remeberMe")
    console.log('rememberMe', rememberMe);
    let userid=localStorage.getItem("userId")
    console.log('userid', userid);

    fetch("http://35.161.99.113:9000/webapi/madmin/rememberMe", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId:userid
      })
    })
      .then(data => {
        return data.json()
      })
      .then( async data => {
        console.log("data", data.records)
        if(!data.records){
         this.setState({
          isLoading : false
         }) 
        }else{

          await sessionStorage.setItem("loginId", data.records.id)
          this.setState({
            isLoading :false,
            userInfo: data.records
           }) 

        }
      })
  }


  render() {

    if(this.state.isLoading){
      return <div>
        <p>Loading...</p>
      </div>
    }


    return (
      <div className="App">
   
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/carddetails" component={CardDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/images" component={CardImage} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/contactus" component={ContactUs} />
        </Switch>
      </div>
    )
  }
}

export default App
