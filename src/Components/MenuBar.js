import React, { Component } from "react"
import {
  Container,
  Menu,
  Button,
  Label,
  Icon,
  Header,
  Segment,
  Image,
  Input
} from "semantic-ui-react"

import { Link, Redirect, Route } from "react-router-dom"

import { CartCircleDiv } from "../StyledComp.js"
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

class MenuBarDemo extends Component {
  state = {
    sidebaropen: false,
    redirectTo: "",
    count: this.props.count,
    id: ""
  }

  async componentDidMount() {
    //this.getCount()

    console.log("count", this.props.count)

    let data = sessionStorage.getItem("loginId")
    console.log("data", data)

    await this.setState({ id: data })
  }

  toggleSidebar = () => {
    this.setState({ sidebaropen: !this.state.sidebaropen })
  }

  openCart = () => {
    this.setState({ redirectTo: "/cart" })
  }

  login = () => {
    this.setState({ redirectTo: "/login" })
  }

  openHome = () => {
    this.setState({ redirectTo: "/" })
  }

  openAbout = () => {
    this.setState({ redirectTo: "/aboutus" })
  }

  openContact = () => {
    this.setState({ redirectTo: "/contactus" })
  }

  openServices = () => {
    this.setState({ redirectTo: "/services" })
  }

  logout = () => {
    //console.log("idd", this.props.location)
    sessionStorage.removeItem("loginId")
    localStorage.removeItem("rememberMe")
    localStorage.removeItem("userId")
    this.setState({id: ""})
    if(this.props.location){

    }else{
      this.setState({ redirectTo: "/" })
    }
    console.log("user is avalable",localStorage.getItem("userId"))
    window.location.reload()
  }

  render() {
    const { redirectTo, redirectTocart } = this.state

    if (redirectTo) {
      return (
        <Redirect
          to={{
            pathname: redirectTo,
            state:{count:this.props.count}
          }}
          push
        />
      )
    }

    // if (redirectTocart) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: redirectTocart,
    //         state: { id: this.props.id}
    //       }}
    //       push
    //     /> 
    //   )
    // }

    return (
      <div>
        <CollapsibleSidebar open={this.state.sidebaropen}>
          <MenuItem mobileOnly onClick={this.openHome}>Home</MenuItem>
          <MenuItem mobileOnly onClick={this.openAbout}>About Us</MenuItem>
          <MenuItem mobileOnly  onClick={this.openServices}>Services</MenuItem>
          <MenuItem mobileOnly onClick={this.openContact}>Contact Us</MenuItem>
          {/* <MenuItem mobileOnly>
            <Icon name="cart" />
            Cart
          </MenuItem> */}


             {!this.state.id ? (
                <MenuItem mobileOnly onClick={this.login}>Sign In</MenuItem>
                ) : (
                  <MenuItem mobileOnly onClick={this.logout}>Log Out</MenuItem>

                )}

                 {/* {this.state.id ? (
                             
          ) : (
            <p />
          )} */}
        </CollapsibleSidebar>
       
        <MenuRow>
          <MenuItem onClick={this.openHome}>Home</MenuItem>
          <MenuItem onClick={this.openAbout}>About Us</MenuItem>
          <MenuItem onClick={this.openServices}>Services</MenuItem>
          <MenuItem onClick={this.openContact}>Contact Us</MenuItem>
          <Spacer />

          {!this.state.id ? (
            <MenuItem onClick={this.login}>Sign In</MenuItem>
          ) : (
            <MenuItem
              onClick={this.openCart}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Icon name="cart" size="big" />
              My Bids
              <CartCircleDiv>
                <span>{this.props.count}</span>
              </CartCircleDiv>
            </MenuItem>
          )}

          {this.state.id ? (
            <MenuItem onClick={this.logout}>Log Out</MenuItem>
          ) : (
            <p />
          )}

         <MenuItem mobileOnly onClick={this.toggleSidebar}>
            Menu
          </MenuItem>
        </MenuRow>
      </div>
    )
  }
}

export default MenuBarDemo
