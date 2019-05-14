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
  FlexCardRow,
  CircleDiv1
} from "../StyledComp.js"
import { Route, Switch, Link, Redirect } from "react-router-dom"
import styled from "styled-components"
import MenuBarDemo from "../Components/MenuBar"
import Footer from "../Components/Footer"
import { Scrollbars } from "react-custom-scrollbars"
import { Button, Checkbox, Form } from "semantic-ui-react"

class Seervice extends Component {
  state = {
    redirectTo: ""
  }

  componentDidMount() {}

  openAuction = () => {
    //console.log("inside function")
    this.setState({ redirectTo: "/" })
  }

  openForm = type => {
    console.log("inside function",type)
    this.setState({ redirectTo: "/contactus" ,reqType:type})
  }

  render() {
    const { redirectTo } = this.state

    if (redirectTo) {
      return (
        <Redirect
          to={{
            pathname: redirectTo,
            state:{type:this.state.reqType}
          }}
          push
        />
      )
    }

    return (
      <div>
        <MenuBarDemo id={this.props.location.state}/>
        <br />
        <Scrollbars style={{ display: "flex", flex: 1, height: 799 }}>
          <PageContainer>
            <br />
            <HeadingText>SERVICES</HeadingText>
            <RedDiv />
            <br />
            <FlexRow>
              <HIWItem title="Auctions" onClick={this.openAuction}/>
              <HIWItem title="Buy" onClick={()=>this.openForm('buy')}/>
              <HIWItem title="Sell" onClick={()=>this.openForm('sell')}/>
            </FlexRow>
            <br />
            <FlexRow>
              <HIWItem title="Insurance" onClick={()=>this.openForm('insurance')}/>
              <HIWItem title="Loans" onClick={()=>this.openForm('loan')}/>
            </FlexRow>
          </PageContainer>
        </Scrollbars>
        <Footer />
      </div>
    )
  }
}

const HIWItem = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 12
      }}
    >
      <CircleDiv1 onClick={props.onClick}>
        <span
          style={{
            color: "palevioletred",
            fontWeight: 600,
            fontSize: 48
          }}
        >
          {props.title}
        </span>
      </CircleDiv1>
    </div>
  )
}

const TextLeft = styled.div`
  align-items: flex-start;
  font-size: 18px;
`

export default Seervice
