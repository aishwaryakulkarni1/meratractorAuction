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
  CardImg,
  CountBtn
} from "../StyledComp.js"
import { Route, Switch, Link } from "react-router-dom"
import styled from "styled-components"
import MenuBarDemo from "../Components/MenuBar"
import Footer from "../Components/Footer"
import { Scrollbars } from "react-custom-scrollbars"
import moment from "moment"
import { Button, Modal } from "semantic-ui-react"
import { numWords } from "../Helper"
import { getauctionofbid, mybidpro } from "./Api";


class Cart extends Component {
  state = {
    list: [],
    auctionData: [], open: false,
    bidPrice: "",
    refreshCount: 0,
    name: [], year: [], refno: [],
    trName: '',
    trefno: '',
    tyear: '',
    query: "",
    TractorName: [],
    TractorRef: [],
    TractorYear: [],
    tracTordata: [],
    cart: {},

    TempTractorData: []


  }


  mybidtest = (id) => {
    console.log('mybid user id', id)

    fetch(mybidpro,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: id
        })
      }
    )
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data.records)
        let unique = data.records
        console.log('unique:', unique)


        this.attachTime(unique)

      })
  }






  async componentDidMount() {

    let userId = await sessionStorage.getItem("loginId")
    console.log('user id', userId)
    let cartSelected = await JSON.parse(sessionStorage.getItem('cart'))
    console.log("card selcted", cartSelected)
    this.mybidtest(userId)
    this.setState({ userId, cart: cartSelected })


    let interval = 2000
    let startInterval = setInterval(() => {


      this.mybidtest(userId)


    }, interval)


    this.timer = startInterval
  }


  componentWillUnmount() {
    clearInterval(this.timer)
  }



  stopInterval = startInterval => {
    clearInterval(startInterval)
    //console.log("stop interval run..")
  }







  callTractor = cart => {
    let auctionDetails = []
    fetch("http://35.161.99.113:9000/webapi/meratractor/bid/myBid", {

      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: cart
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data based on user id", data.records)

        if (data.records) {
          let list = data.records

          list.map(i => {
            i.images = []
          })

          this.removeDuplicates(list)


          this.addimage(list)

          // this.setState({ list: data.records }
        }
      })

  }


  addimage = (list) => {

    let finalimagedata = []

    let tempdata = []


    for (let i = 0; i < list.length; i++) {

      fetch(
        "http://35.161.99.113:9000/webapi/meratractor/auction/getLinkByauctionDetails",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            auctiondetail_id: list[i].auctiondetail_id
          })
        }
      )
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("image api call data", data.records)
          tempdata = data.records

          // if(list[i].auctiondetail_id == t)



          tempdata.map(j => {

            if (i.auctiondetail_id === j.auctiondetail_id) {
              finalimagedata.push(j)
              // list[i].images.push({ name: j.imgName, link: j.link })
              // this.setState({})
            }
          })
          // finalimagedata.push(tempdata)
          console.log('finalimagedata:', finalimagedata)

        })
    }

    list.map(i => {

      fetch(
        "http://35.161.99.113:9000/webapi/meratractor/auction/getLink",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            auction_id: i.auction_id
          })
        }
      )
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("image api call data", data.records)
          tempdata = data.records


          tempdata.map(j => {

            if (i.auction_id === i.auction_id) {
              finalimagedata.push(j)
            }
          })


        })



    })


    console.log('finalimagedata:', finalimagedata)



  }



  pushImages = (imageArray = [], tractorArray) => {
    imageArray.map(item => {
      let auctiondetail_id = item.auctiondetail_id
      for (let i = 0; i < tractorArray.length; i++) {
        let tractorItem = tractorArray[i]

        if (tractorItem.auctiondetail_id === auctiondetail_id) {
          tractorItem.images.push({ name: item.imgName, link: item.link })
        }

        tractorArray[i] = tractorItem
      }
    })
    console.log("after image pushed tractorArray", tractorArray)
    // this.setState({ list: tractorArray })
    this.removeDuplicates(tractorArray)
  }









  removeDuplicates = list => {
    //auctiondetail_id

    let auctionDetailIds = []
    let finalList = []
    let uniquetest = []
    let test = []


    list.map(item => {

      finalList.push(item)
      console.log('finalList:', finalList)

    })



    var sort_by = function (field, reverse, primer) {

      var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };

      reverse = !reverse ? 1 : -1;

      return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      }
    }


    finalList.sort(sort_by('bidPrice', true, parseInt));






    // Sort by city, case-insensitive, A-Z
    // finalList.sort(sort_by('city', false, function(a){return a.toUpperCase()}));



    let cnt = {}

    finalList.map(i => {
      let unique = true
      cnt = {}
      uniquetest.map(j => {

        if (i.auctiondetail_id === j.auctiondetail_id) {
          unique = false
          cnt = j

        }
      })

      if (unique) {
        uniquetest.push(i)
      } else {
        test.push(cnt)
      }

    })
    console.log('uniquetest:', uniquetest)
    console.log('test:', test)
    //this.addimage(uniquetest)
    //this.attachTime(uniquetest)
  }


  attachTime = list => {
    let finalList = list.map(item => {
      let newItem = item
      this.state.auctionData.map(listItem => {
        if (item.auction_id == listItem.auction_id) {
          newItem.toDate = listItem.toDate
        }
      })
      return newItem
    })
    this.setState({ list: finalList })
    this.deleteItems()
  }

  deleteItems = () => {
    console.log("delete data", this.state.list)
    let today = moment()
    this.state.list.map(item => {
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

    fetch(
      "http://35.161.99.113:9000/webapi/meratractor/auction/updateStatus",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auctiondetail_id: item.auctiondetail_id,
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


  submit = res => {
    // console.log('inside function');
    console.log('res', res);
    // console.log('input value', this.state.bidPrice);
    // this.setState({ loading: true })
    // if (!this.state.bidPrice) {
    if (!this.state.bidPrice) {
      this.setState({ msg: "Please enter Bid or Auction is expierd" })

      this.setState({ warning: "Please enter Bid or Auction is expierd" })
    } else {



      let count;
      fetch(getauctionofbid, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tractorId: res.auctiondetail_id
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("count", data.count)
          count = data.count
        })


      fetch("http://35.161.99.113:9000/webapi/meratractor/bid/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auction_id: res.auction_id,
          auctiondetail_id: res.auctiondetail_id,
          user_id: res.user_id,
          latestPrice: this.state.bidPrice,
          bidPrice: this.state.bidPrice
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data.records)
          this.empty()

          let bidCountupdate = data.records

          this.setState({ bidCount: data.records })





          fetch(
            "http://35.161.99.113:9000/webapi/meratractor/bid/getAuctionDetails",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                auctiondetail_id: res.auctiondetail_id
              })
            }
          )
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log("auction details data", data.records)

              let auctionData = data.records

              let nos = auctionData.map(item => parseInt(item.bidPrice))
              console.log("nos", nos)

              let max = Math.max(...nos)
              console.log("max", max)

              this.updateLatestPrice(max, res.auctiondetail_id, count)
            })
        })

    }
  }

  updateLatestPrice = (max, id, bids) => {
    const newBids = parseInt(bids) + 1

    console.log("new bid", newBids)
    fetch(
      "http://35.161.99.113:9000/webapi/meratractor/bid/updateLatestPrice",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auctiondetail_id: id,
          latestPrice: max,
          no_of_bids: newBids
        })
      }
    )
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("update data", data.message)
        // this.setState({ loading: false })
      })
  }



  handlebid = e => {
    this.setState({ bidPrice: e.target.value })
    //console.log("targeted value", e.target.value)
  }


  empty = () => {
    console.log("inside empty")
    this.state.bidPrice = ""
  }



  openImg = res => {
    //sessionStorage.setItem('images' ," ")
    //this.setState({ redirectTo: "/images",imgDetails: images })
    console.log("image array", res)
    let img = []
    // img= images
    // this.setState({imageModel:true}).
    sessionStorage.setItem('mybid', 'mybid')

    sessionStorage.setItem('MyBidImages', JSON.stringify(res))

    window.open("/images")

  }


  render() {
    let { list, bidPrice } = this.state

    let card = this.state.list

    // if(this.state.trName.length > 0){
    //   list = this.state.TractorName
    // }

    // if(this.state.trefno.length > 0){
    //   list = this.state.TractorRef
    // }

    // if(this.state.tyear.length > 0){
    //   list = this.state.TractorYear
    // }



    return (
      <div>
        <MenuBarDemo id={this.props.location.state} count={this.props.location.state.count} />
        <br />
        <Scrollbars style={{ display: "flex", flex: 1, height: 804 }}>
          <PageContainer>
            <br />
            <HeadingText>My Bids</HeadingText>
            <RedDiv />
            <FlexRow2 >
              {card.map(res => (
                <div>

                  {res.images ? (
                    <div style={{ padding: 32, display: "flex" }}>
                      <Card
                        status={res.status}
                        title={res.description}
                        latest={res.latestPrice}
                        value={bidPrice}
                        no_of_bids={res.no_of_bids}
                        onChange={this.handlebid}

                        actualPrice={res.bidPrice}
                        status={res.status}
                        img1={
                          res.link && res.link
                            ? res.link
                            : "/images/no_image_750.jpg"
                        }
                        onClick1={() => this.openImg(res)}

                        onClick={() => this.submit(res)}
                      />
                    </div>



                  ) : (


                      <div style={{ padding: 32, display: "flex" }}>
                        <Card
                          status={res.status}
                          title={res.description}
                          latest={res.latestPrice}
                          value={bidPrice}
                          no_of_bids={res.no_of_bids}
                          onChange={this.handlebid}
                          actualPrice={res.bidPrice}
                          status={res.status}
                          img1="/images/no_image_750.jpg"
                          onClick={() => this.submit(res)}
                        />
                      </div>





                    )}
                </div>
              ))}
            </FlexRow2>
          </PageContainer>
        </Scrollbars>
        <Footer />
      </div>
    )
  }
}

class HIWItem extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }
  state = {
    warning: "",
    open: false
  }


  submitBidClicked = size => {
    this.setState({ warning: "" })
    let x1 = parseInt(this.props.bid) + 5000
    let x2 = parseInt(this.input.value)
    console.log("this.input.value", x2)
    console.log("bid value", x1)
    if (!this.input.value) {
      this.setState({ warning: "Please submit valid bid value" })
      return
    }

    if (x1 > x2) {
      console.log("false")
      this.setState({
        warning: "Please enter bid greater than your latest price + 5000"
      })
    } else {
      console.log("true") //console.log("true")

      this.setState({ size, open: true })

      // this.props.onClick()
      // this.input.value = ""
    }

    //this.props.onClick()
  }

  close = () => this.setState({ open: false })

  clickYes = () => {
    this.props.onClick()
    this.input.value = ""
    this.close()
  }

  render() {
    const { open, size } = this.state

    // let amountInWords = ""
    // if (this.input.value) {
    //   amountInWords = numWords(this.input.value)
    // }



    console.log('this.props.img1', this.props.img1);

    let text = this.props.text



    var words = text.split(" ");
    for (var i = 0; i < words.length - 1; i++) {
      words[i] += " ";

    }
    console.log(words);


    // if(text.length > 5) {

    //   let substr = text.substr(0,5)
    //   var parts=str.split(delim);
    // return [parts[0], parts.splice(1,parts.length).join(delim)];

    //   console.log("sub string is",substr)
    // }


    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 20,
          boxShadow: "0px 0px 5px 2px rgba(31,30,30,0.6)"
        }}

      >
        <CountBtn>
          <span
            style={{
              fontWeight: 600,
              fontSize: 18
            }}
          >
            Status: {this.props.status}
          </span>
        </CountBtn>
        {/* <CardImg>
        <img src={props.number} alt="Paris" />
     </CardImg>*/}
        <img src={this.props.img1} alt="Tractor" width="300" height="100" />
        <span style={{ fontWeight: 300, padding: 12, color: "palevioletred" }}>
          {this.props.text}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            margin: "10px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{this.props.start}</span>
            <span>{this.props.bid}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{this.props.actual}</span>
            <span>{this.props.actualPrice}</span>

            <form>
              <input
                type="text"
                placeholder="Enter price"
                style={{
                  padding: "5px",
                  border: "none",
                  borderRadius: 4,
                  marginRight: 8,
                  border: "1px solid #111"
                }}
                value={this.props.actualPrice}
                onChange={this.props.onChange}
                ref={input => (this.input = input)}
              />
            </form>
          </div>
        </div>
        <button
          onClick={() => this.submitBidClicked("mini")}
          type="button"
          style={{
            backgroundColor: "palevioletred",
            padding: "5px",
            border: "1px solid palevioletred",
            color: "#fff",
            borderRadius: 6,
            margin: "10px"
          }}
        >
          {this.props.btn}
        </button>



        <Modal size="mini" open={this.state.open} onClose={this.close}>
          <Modal.Content>
            <p>
              Are you sure you want to submit a bid of value Rs.
              {this.input.value}
              <br />

            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button positive content="Yes" onClick={this.clickYes} />
          </Modal.Actions>
        </Modal>

      </div>
    )
  }
}


class Card extends Component {


  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  state = {
    warning: "",
    open: false
  }

  submitBidClicked = size => {
    this.setState({ warning: "" })
    let x1 = parseInt(this.props.latest) + 5000
    let x2 = parseInt(this.input.value)
    console.log("this.input.value", x2)
    console.log("bid value", x1)

    if (this.props.status === 'expired') {
      this.setState({ warning: "Auction is Expired" })
      return
    }
    if (!this.input.value) {
      this.setState({ warning: "Please submit valid bid value" })
      return
    }

    if (x1 > x2) {
      console.log("false")
      this.setState({
        warning: "Please enter bid greater than your latest price + 5000"
      })
    } else {
      console.log("true") //console.log("true")

      this.setState({ size, render: true })
      // this.submit()
      this.props.onClick()
      // this.input.value = ""
    }

    //this.props.onClick()
  }

  close = () => this.setState({ open: false })

  clickYes = () => {
    this.props.onClick()
    this.input.value = ""
    this.close()
  }

  render() {
    const { open, size } = this.state



    let amountInWords = ""
    if (this.input.value) {
      amountInWords = numWords(this.input.value).toUpperCase()
    }



    console.log('this.props.img1', this.props.img1);



    return (
      <div className="card card-with-shadow">
        <img
          className="card-img-top"
          style={{ objectFit: "cover", maxWidth: 300, maxHeight: 200 }}
          src={this.props.img1}
          alt="Card image cap"
          onClick={this.props.onClick1}
        />
        <div
          className="card-body"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Label status={this.props.status} />
          <h5 className="card-title" style={{ flex: 1 }}>
            {this.props.title}
          </h5>
          <div style={{ display: "flex" }}>
            <p style={{ flex: 1 }} className="card-text">
              <span style={{ fontSize: 14 }}>Latest Bid:</span>
              <br />
              <span style={{ fontWeight: "bold", fontSize: 24 }}>₹{this.props.latest}</span>
            </p>
            <p style={{ flex: 1 }} className="card-text">
              <span style={{ fontSize: 14 }}>Your Bid:</span>
              <br />
              <span
                style={{ fontWeight: "bold", fontSize: 24, color: "#3A7FB4" }}
              >
                {this.props.actualPrice}
              </span>
            </p>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                New bid: ₹
            </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Enter value here"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.props.onChange}
              ref={input => (this.input = input)}
              value={this.props.bidPrice}
            />
          </div>
          <span>
            <font color="red">{this.state.warning}</font>
          </span>
          <div style={{ display: "flex" }}>
            <a style={{ flex: 1 }} className="btn btn-primary" onClick={() => this.submitBidClicked("mini")}>
              Submit Bid
          </a>
          </div>
        </div>

        {/*       
{this.state.open && (

  <div>
      <p>
              Are you sure you want to submit a bid of value Rs.
              {this.input.value}
              <br />
              {amountInWords}
            </p>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button positive content="Yes" onClick={this.clickYes} />
    </div>
)}
       */}


        <Modal style={{ width: "70%", height: '200px', margin: "20%", marginTop: "20%" }} size="mini" open={this.state.open} onClose={this.close}>
          <Modal.Content>
            <p>
              Are you sure you want to submit a bid of value Rs.
              {this.input.value}
              <br />
              {amountInWords}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button positive content="Yes" onClick={this.clickYes} />
          </Modal.Actions>
        </Modal>

      </div>
    );
  }
};

const Label = props => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end"
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: "bold",
          background: `${props.status === "expired" ? "#E4271E" : "#8CC444"}`,
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: 4,
          color: "#fff"
        }}
      >
        {props.status === "expired" ? "EXPIRED" : "LIVE"}
      </span>
    </div>
  );
};

const styles = {
  card: {
    width: 300,
    margin: 18,
    boxShadow: "0 15px 35px 0 rgba(42,51,83,.12),0 5px 15px rgba(0,0,0,.06)",
    transition: "all 0.15s"
  }
};


export default Cart
