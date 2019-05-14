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
import { Modal, Button, Image, Header } from "semantic-ui-react"
import moment from "moment"


class Landing extends Component {
  state = {
    auctioData: [],
    redirectTo: "",
    refreshCount: 0,
    bidCount: 0,
    userId: "",
    defaultSelection: true
    // userId:this.props.location.state.id
  }


  async componentDidMount() {
    // console.log(this.props.location.state.id)
    let userId = await sessionStorage.getItem("loginId")
    console.log('userId', userId);
    //console.log("user id",this.props.location.state)
    this.setState({ userId: userId })
    if (userId) {
      this.getCount(userId)
      this.setState({ userId, defaultSelection: false })

    }
    this.callAuction()

    // will call this function 


    let interval = 2000

    let startInterval = setInterval(() => {
      if (this.state.refreshCount < 12) {

        this.callAuction()
        this.setState({ refreshCount: this.state.refreshCount + 1 })
      } else {
        this.stopInterval(startInterval)
      }
    }, interval)

    this.timer = startInterval

  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  stopInterval = startInterval => {
    clearInterval(startInterval)
  }

  callAuction = () => {
    let dataauction = []
    fetch("http://35.161.99.113:9000/webapi/meratractor/auction/list", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data.records)
        dataauction = data.records
        this.state.auctioData = []
        dataauction.map(i => {
          if (i.status == 'live') {
            this.state.auctioData.push(i)
          }
        })
        console.log('this.state.auctioData', this.state.auctioData);
        this.updateAuction();


        // this.setState({ auctioData: data.records })
      })
  }


  updateAuction = () => {
    console.log("delete data", this.state.auctioData)

    let today = moment()
    this.state.auctioData.map(item => {
      let expireDate = moment(item.toDate, "YYYY-MM-DD hh:mm:ss")
      console.log("expireDate", expireDate.format("YYYY-MM-DD hh:mm:ss"))
      // let expireDate = today.add(2, 'days')
      let latest = moment.max(expireDate, today)
      console.log("latest", latest.format("YYYY-MM-DD hh:mm:ss"))
      console.log("today", today.format("YYYY-MM-DD hh:mm:ss"))
      let testValue = latest.format("YYYY-MM-DD hh:mm:ss") == today.format("YYYY-MM-DD hh:mm:ss")
      if (testValue) {
        this.deleteItemApiCall(item)
      }
    })

  }

  deleteItemApiCall = item => {
    console.log("api", item)

    console.log("Inside Delete API call", item)

    fetch(
      "http://35.161.99.113:9000/webapi/meratractor/auction/updateAuctionStatus",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // auctiondetail_id: item.auctiondetail_id,
          auctionid: item.auction_id
        })
      }
    )
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data)
      })
  }

  openCart = cart => {
    console.log("inside function")
    console.log('this.props.location.state.id', this.props.location.state);

    if (!this.state.userId) {
      alert("Please sign in")
    } else {
      sessionStorage.setItem("cart", JSON.stringify(cart))
      this.setState({ redirectTo: "/carddetails", cartdetails: cart })
    }

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

  handelCloseModel = () => {
    this.setState({ defaultSelection: false })
  }

  handelInquiry = () => {
    this.setState({ redirectToInquiry: true })
  }



  render() {
    const { redirectTo, userId } = this.state

    if (redirectTo) {
      return (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { cart: this.state.cartdetails, id: this.props.location.state.id }
          }}
          push
        />
      )
    }


    return (
      <div className="App">
        <MenuBarDemo count={this.state.bidCount} id={this.props.location.state} location={this.props.location.pathname} />
        <br />
        <Scrollbars style={{ display: "flex", flex: 1, height: 799 }}>
          <PageContainer>
            <br />
            {userId > 0 ? (
              <PageContainer>
                <HeadingText>CURRENT AUCTIONS</HeadingText>
                <RedDiv />
                <FlexCardRow>
                  {this.state.auctioData.map(res => (

                    <CardItem
                      name={res.bankName}
                      description={res.description}
                      onClick={() => this.openCart(res)}
                    />
                  ))}
                </FlexCardRow>
              </PageContainer>
            ) : (
                <PageContainer>
                  <HeadingText>HOW IT WORKS</HeadingText>
                  <RedDiv />
                  <FlexRow>
                    <HIWItem
                      number="01"
                      title="REGISTER"
                      text="Call us at 8888009900 to register now"
                    />
                    <HIWItem number="02" title="SUBMIT A BID" text="Login and Bid" />
                    <HIWItem
                      number="03"
                      title="WIN"
                      text="Bid highest amount to win the tractor"
                    />
                  </FlexRow>
                  <br />
                  <HeadingText>CURRENT AUCTIONS</HeadingText>
                  <RedDiv />
                  <FlexCardRow>
                    {this.state.auctioData.map(res => (

                      <CardItem
                        name={res.bankName}
                        description={res.description}
                        onClick={() => this.openCart(res)}
                      />

                    ))}
                  </FlexCardRow>
                </PageContainer>
              )}

            <Modal style={{ width: "70%", height: '200px', margin: "20%", marginTop: "20%" }} size='small' open={this.state.defaultSelection}>
              <Modal.Content >
                <div
                  id="12345"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 12,
                    justifyContent: "flex-start"
                  }}
                >
                  <CardDiv onClick={() => this.handelInquiry()}>
                    <center><span style={{ fontWeight: 600, fontSize: 24 }}  >Inquiry</span></center>
                    {this.state.redirectToInquiry && <Redirect to="/contactus" push />}
                  </CardDiv>
                  <hr style={{ margin: "3px" }} />

                  <CardDiv onClick={() => this.handelCloseModel()}>
                    <center><span style={{ fontWeight: 600, fontSize: 24 }}>Auction</span></center>
                  </CardDiv>
                </div>
              </Modal.Content>
            </Modal>

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
      <CircleDiv>
        <span
          style={{
            color: "palevioletred",
            fontWeight: 600,
            fontSize: 48
          }}
        >
          {props.number}
        </span>
      </CircleDiv>
      <span
        style={{
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: 2,
          marginTop: 30
        }}
      >
        {props.title}
      </span>
      <RedDiv />
      <span style={{ fontWeight: 300 }}>{props.text}</span>
    </div>
  )
}

const CardItem = props => {
  return (
    <div
      onClick={props.onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 12,
        justifyContent: "flex-start"
      }}
    >
      <CardDiv>
        <span
          style={{
            fontWeight: 600,
            fontSize: 18
          }}
        >
          {props.name}
        </span>
        <br />
        <span>{props.description}</span>
      </CardDiv>
    </div>
  )
}

export default Landing

