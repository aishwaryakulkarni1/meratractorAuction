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
import { Route, Switch, Link, Redirect } from "react-router-dom"
import styled from "styled-components"
import MenuBarDemo from "../Components/MenuBar"
import Footer from "../Components/Footer"
import { Scrollbars } from "react-custom-scrollbars"
import { Button, Checkbox, Form } from "semantic-ui-react"

class ContactUs extends Component {
  state = {
    name: "",
    number: "",
    email: "",
    remark: "",
    msg: "",
    type: ""
  }

  componentDidMount() {
    // console.log(this.props.location.state.id)
    // if(this.props.location.state.type === 'undefined'){
    //   this.setState({type:''})
    // }else{
    //   this.setState({type:this.props.location.state.type})
    // }
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

  handleName = e => {
    this.setState({ name: e.target.value })
    this.setState({ msg: "" })
  }

  handlNumber = e => {
    if (this.validateNumber(e.target.value)) {
      this.setState({ number: e.target.value })
      this.setState({ msg: "" })
    }
  }

  handleEmail = e => {
    this.setState({ email: e.target.value })
    this.setState({ msg: "" })
  }

  handleRemark = e => {
    this.setState({ remark: e.target.value })
    this.setState({ msg: "" })
  }

  handletype=e=>{
this.setState({type:e.target.value})
  }

  submit = () => {
    if (!this.state.name) {
      this.setState({ msg: "Please enter name" })
    } else if (!this.state.number) {
      this.setState({ msg: "Please enter number" })
    } else if (!this.state.email) {
      this.setState({ msg: "Please enter name" })
    } else {
      fetch("http://35.161.99.113:9000/webapi/meratractor/bid/createContact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          number: this.state.number,
          email: this.state.email,
          remark: this.state.remark,
          type:this.state.type
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data.message)
          if (data.message === "Add Data succesfully") {
            window.location.reload()
          } else {
          }
        })
    }
  }

  render() {
    const { name, number, email, remark, msg, type } = this.state

    return (
      <div>
        <MenuBarDemo id={this.props.location.state} />
        <br />
        <Scrollbars style={{ display: "flex", flex: 1, height: 799 }}>
          <PageContainer>
            <br />
            <HeadingText>CONTACT US</HeadingText>
            <RedDiv />
            <br />
            <TextLeft>Contact No - 8888009900 </TextLeft>
            <br />
            <TextLeft>Email ID - contact@meratractor.com </TextLeft>
            <br />

            <FlexRow>
              <Form style={{ width: "40%" }}>
                <Form.Field>
                  <label style={{ textAlign: "left" }}>Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={this.handleName}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ textAlign: "left" }}>Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    value={number}
                    onChange={this.handlNumber}
                    maxLength="10"
                  />
                </Form.Field>

                <Form.Field>
                  <label style={{ textAlign: "left" }}>Mail ID</label>
                  <input
                    type="text"
                    placeholder="Enter mail id"
                    value={email}
                    onChange={this.handleEmail}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ textAlign: "left" }}>Remark</label>
                  <input
                    type="text"
                    placeholder="Enter remark"
                    value={remark}
                    onChange={this.handleRemark}
                  />
                </Form.Field>

                <Form.Field>
                  <label style={{ textAlign: "left" }}>Request Type</label>
                  <select value={type} onChange={this.handletype}>
                  <option value="" disabled selected hidden>Request Type</option>
                    <option value="sell">I am interested in Selling</option>
                    <option value="buy">I am interested in Buying</option>
                    <option value="insurance">I am interested in Insurance</option>
                    <option value="loan">I am interested in Loans</option>
                    ))}
                  </select>
                </Form.Field>
                <button
                  onClick={this.submit}
                  type="button"
                  style={{
                    backgroundColor: "palevioletred",
                    padding: "10px",
                    border: "1px solid palevioletred",
                    color: "#fff",
                    borderRadius: 6,
                    margin: "10px",
                    width: "20%",
                    fontSize: "18px"
                  }}
                >
                  Submit
                </button>

                <p>
                  <font color="red">{msg}</font>
                </p>
              </Form>
            </FlexRow>
          </PageContainer>
        </Scrollbars>
        <Footer />
      </div>
    )
  }
}

const TextLeft = styled.div`
  align-items: flex-start;
  font-size: 18px;
`

export default ContactUs
