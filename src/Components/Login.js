import React, { Component } from "react"
import {
  PageContainer,
  CircleMainDiv,
  HeadingText,
  CircleDiv,
  CardDiv,
  RedDiv,
  FlexRow,
  FlexRow2,
  MenuRow,
  MenuItem,
  Spacer,
  CollapsibleSidebar,
  FlexCardRow
} from "../StyledComp.js"
// import backdrop from "./backdrop"
// import Modal from './Modal'
import { Route, Switch, Link, Redirect } from "react-router-dom"
import styled from "styled-components"
import MenuBarDemo from "../Components/MenuBar"
import Footer from "../Components/Footer"
import { Scrollbars } from "react-custom-scrollbars"
import { Button, Checkbox, Form,Modal } from "semantic-ui-react"
import {forgotPwd,verifyOTP,CheckOTP,changePwd} from './Api'

import '../Components/card.css'

class Login extends Component {
  state = {
    number: "",
    pass: "",
    warning: "",
    id: "",
    checkRemeber:false,
    bidCount:0,
    open:false,
    open1:false,
    otp:'',
    newpass:'',
    confirmPass:''
  }

  getCount = (id) => {
    // api to get count

    fetch("http://35.161.99.113:9000/webapi/meratractor/bid/count", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data bid count", data.count)
        this.setState({ bidCount: data.count })
      })
  }

  componentDidMount() {

  }

  validatephno = mbno => {
    if (!isNaN(mbno)) {
      return true
    }
    return false
  }

  validateNumber = input => {
    if (input === "") {
      return true
    }
    let pattern = /^\d+(\.\d{1,2})?$/
    return pattern.test(input)
  }

  handleno = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ number: e.target.value })
    }
  }

  handlepass = e => {
    this.setState({ pass: e.target.value })
  }

  submit = () => {
    console.log("suubmit clicked")
    if (!this.state.number) {
      this.setState({ warning: "Please enter mobile number" })
    } else if (!this.state.pass) {
      this.setState({ warning: "Please enter password" })
    } else {
      fetch("http://35.161.99.113:9000/webapi/madmin/sign_in", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          u_number: this.state.number,
          u_pass: this.state.pass
        })
      })
        .then(data => {
          return data.json()
        })
        .then(async data => {

          console.log(data)
          if(data.records){
            await sessionStorage.setItem("loginId", data.records.id)
            if(this.state.checkRemeber == true){
              localStorage.setItem("remeberMe",this.state.checkRemeber)
              localStorage.setItem("userId",data.records.id)
            }
            this.setState({ id: data.records.id, redirectToauction: true})
            this.setState({warning:" "})
           
          }else{
            // console.log("data", data.records.id)
            this.setState({warning:"Please Enter Valid Credential"})

            }
      })
    }
  }

  show = (size) => {
    if(!this.state.number){
      this.setState({warning:"Please enter mobile number"})
    }else{

      fetch("http://35.161.99.113:9000/webapi/madmin/forget_password", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              u_number: this.state.number
            })

            }).then(data => {
              return data.json();
              }).then(data => {
                console.log("data",data.message)
                if(data.message === 'Correct number'){
                  this.setState({ size, open: true ,warning:""})          
                }else{
                  this.setState({warning:"Please enter valid mobile number" })                            
                }
              })
      //this.setState({ size, open: true })
    }
  }


  close1 = () => this.setState({ open1: false })

  reset = (size1) => {
    this.setState({ size1, open1: true,open:false })

    let random
    let max = 1000
    let min = 9000
    random = Math.floor(Math.random() * (max - min + 1)) + min
    // console.log(random)

    let authkey = "107112Ai7pfplyOcF570cc12e"
    let sender = "MSGIND"
    let route = "4"
    let number = this.state.number
    let message = "MeraTractor password assistance system genrated OTP -" + random

    let url='http://control.msg91.com/api/sendhttp.php?authkey='+authkey+'&mobiles='+number+'&message='+message+'&sender='+sender+'&route='+route+'&country=91';

    console.log(url)
    fetch(url, {mode: 'no-cors'}).then(response =>{
      //console.log(response)
      fetch(verifyOTP, {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          u_number:this.state.number,  
          otp:random
          })
        }).then(data => {
          return data.json();
      }).then(result =>{
          console.log("verify",result)
      })
 })

  }

  handleotp = e => {
    this.setState({ otp: e.target.value })
  }

  close2 = () => this.setState({ open2: false })

  TestOTP = (size) => {

    if(!this.state.otp){
     return this.setState({warning:"Please enter otp"})
    }
        fetch(CheckOTP, {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          u_number:this.state.number,  
          otp:this.state.otp
          })
        }).then(data => {
          return data.json();
      }).then(result =>{          
          console.log('result:', result)
          if(result.message == "verify OTP"){
            this.setState({ open1:false, open2: true,warning:''})
           
        
          }else{
            this.setState({warning:"OTP is worng"}) 
          
          }
      })
    }


  update = () => {


    if(this.state.newpass == this.state.confirmPass){
    fetch(changePwd, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        u_number:this.state.number,  
        u_pass:this.state.newpass
        })
    }).then(result =>{
        console.log("update",result)
        this.setState({warning:'Password Confirmed'})
        setTimeout(()=>{
          this.close2()
          window.location.reload();
  
        },1000)
      
    })
  }else{
    return this.setState({warning:'Please enter password as above'})
  }
}

  handleNpass=e=>{
    this.setState({confirmPass:e.target.value})
  }


  handlenewPass=e=>{
    this.setState({newpass:e.target.value})

  }


  rmember=()=>{

    console.log('this.state.checkRemeber', this.state.checkRemeber);
    // localStorage.setItem("remeber me",)
    this.setState({checkRemeber:!this.state.checkRemeber})
  }


  close=()=>{
    this.setState({open:false})
  }



  render() {
    const { number, pass, redirectToauction } = this.state

    if (redirectToauction) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { id: this.state.id,
                    bidCount:this.state.bidCount
                    }
          }}
          push
        />
      )
    }

    return (
      <div>
        <MenuBarDemo />
        <br />
        <PageContainer>
          <br />
          <HeadingText>Login</HeadingText>

          <br />
          <Form style={{ width: "40%" }}>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Mobile Number</label>
              <input
                type="text"
                placeholder="Enter mobile no"
                value={number}
                onChange={this.handleno}
                maxLength="10"
              />
            </Form.Field>
            <Form.Field>
              <label style={{ textAlign: "left" }}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={pass}
                onChange={this.handlepass}
                autocomplete="on"
              />
            </Form.Field>

            <Form.Field style={{ textAlign: "left" }}>
              <Checkbox label="Save Password" onChange={this.rmember} checked={this.state.checkRemeber} />

              <p className="" style={{ float: "right",color:"#4183c4" }} onClick={() =>this.show('tiny')}>Forgot Password?</p>
            </Form.Field>
           
           <p><font color="red">{this.state.warning}</font></p><br/>
            <Button type="submit" onClick={this.submit}>
              Submit
            </Button>
          </Form>



        
          {/* <backdrop show = {this.state.open}>
           <Modal>
             <h1>Test 1</h1>

           </Modal>
          </backdrop> */}
            {this.state.open ?(
 <div className='modalinit'>

  <div className ="modalContainer">
  
  <div style={{ padding: "10px ",
  backgroundColor: '#dc143c',
  color: "white"}}>
      <span style={{color: "#000",
  textDecoration: "none",
  cursor: "pointer"}}></span>
      <h2>Forgot Password</h2>
    </div>
    <div style={{padding: "2px 16px ",marginBottom:"10px"}}>
    <p> Do you want to reset password via OTP verification {number} ?</p>
   
    </div>
    <hr/>
    <div style={{ 
      padding: "2px",
      color: "white"
  }}>
         <Button color='red'  inverted onClick={this.close}>
        Cancel
      </Button>
      <Button color='green' inverted onClick={()=> this.reset('mini')}>
      Ok
      </Button>
    </div>
  </div>




 
</div>
            ):(
null
            )}
           
              
          {/* <Modal open={this.state.open} onClose={this.close} size='mini'>
          <Modal.Header>Reset Password</Modal.Header>
          <Modal.Content>
            <p> Do you want to reset password via OTP verification {number} ?</p>
          </Modal.Content>

    <Modal.Actions>
      <Button color='red' inverted onClick={this.close}>
        Cancel
      </Button>
      <Button color='green' inverted onClick={()=> this.reset('mini')}>
      Ok
      </Button>
    </Modal.Actions>
  </Modal>
 */}

{this.state.open1 ? (

  <div className='modalinit'>
  <div className ="modalContainer">
  <div style={mheader}>
  <h2>OTP Confirmation</h2>

  </div>


<div style={mbody}>
<p>Please enter OTP</p>
        <Form>
            <Form.Field>
            
                    <input placeholder='Enter otp'  
                        value={this.state.otp}
                        onChange={this.handleotp}
                        required
                    />
            
            </Form.Field>
          </Form>             
</div>

<hr/>
<div style={mfooter}>
<Button  color='red' inverted onClick={this.close1}>
        Cancel
      </Button>
      <Button color='green' inverted onClick={()=>this.TestOTP('tiny')}>
     VeriFy
       </Button>
</div>
  </div>
  </div>

):(
null
)}

   {/* <Modal size='mini' open={this.state.open1}>
    <Modal.Header>OTP Confirmation</Modal.Header>
    <Modal.Content >
        <p>Please enter OTP</p>
        <Form>
            <Form.Field>
            
                    <input placeholder='Enter otp'  
                        value={this.state.otp}
                        onChange={this.handleotp}
                        required
                    />
            
            </Form.Field>
          </Form>                      
    </Modal.Content>

     <Modal.Actions>

     <p style={{textAlign:"center"}}><font color="red">{this.state.warning}</font></p><br/>

      <Button  color='red' inverted onClick={this.close1}>
        Cancel
      </Button>
      <Button color='green' inverted onClick={()=>this.TestOTP('tiny')}>
     VeriFy
       </Button>
    </Modal.Actions>
  </Modal> */}

{this.state.open2 ?(

  <div className='modalinit'>

  <div className ="modalContainer">
  
  <div style={mheader}>

  <h2>Change Password</h2>
  </div>

  <div style={mbody}>
  <p>OTP verified.</p> 
        <p>Change your password below.</p> 
    
                <p>Username : {number}</p>
        <Form>
          <Form.Field>
              <label>Enter new password</label>
              <input placeholder='Enter new password' 
                  type="password" 
                  value={this.state.newpass}
                  onChange={this.handlenewPass}
                  required
              />
          </Form.Field>

          <Form.Field>
              <label >Retype password</label>
              <input placeholder='Retype password'  
                  type="password"
                  value={this.state.confirmPass}
                  onChange={this.handleNpass}
                  required
              />
          </Form.Field>
        </Form>                       
        </div>
        <hr/>
        <div style={mfooter}>
        <center><p><font color="red">{this.state.warning}</font></p></center>
      <Button color='red' inverted onClick={this.close2}>
        Cancel
      </Button>
      <Button color='green' inverted onClick={this.update}>
      Ok
      </Button>
        </div>
  </div>
</div>
  ):(

          null
)}

    {/* <Modal size='small' open={this.state.open2}>
    <Modal.Header>Change Password</Modal.Header>
     
     
      <Modal.Content>  
        <p>OTP verified.</p> 
        <p>Change your password below.</p> 
    
                <p>Username : {number}</p>
        <Form>
          <Form.Field>
              <label>Enter new password</label>
              <input placeholder='Enter new password' 
                  type="password" 
                  value={this.state.newpass}
                  onChange={this.handlenewPass}
                  required
              />
          </Form.Field>

          <Form.Field>
              <label >Retype password</label>
              <input placeholder='Retype password'  
                  type="password"
                  value={this.state.confirmPass}
                  onChange={this.handleNpass}
                  required
              />
          </Form.Field>
        </Form>                       
        
        
      </Modal.Content>

      <Modal.Actions>
        <center><p><font color="red">{this.state.warning}</font></p></center>
      <Button color='red' inverted onClick={this.close2}>
        Cancel
      </Button>
      <Button color='green' inverted onClick={this.update}>
      Ok
      </Button>
    </Modal.Actions>
  </Modal> */}
 

        
        </PageContainer>

        {/* {this.state.redirectToauction && <Redirect to="/" push />} */}
      </div>
    )
  }
}

const mcontainer = {
  position: "relative",
  backgroundColor: "#fefefe",
  margin: "25px",
  padding: "0",
  border:" 1px solid #888",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  width:'550px'
}


const mheader = {
  padding: "10px ",
  backgroundColor: '#dc143c',
  color: "white"
}

const closeLogo = {
  color: "#000",
  textDecoration: "none",
  cursor: "pointer"
}

const mbody = {
  padding: "2px 16px ",marginBottom:"10px"
} 

const mfooter = {
  padding: "2px",
  color: "white"
}

export default Login
