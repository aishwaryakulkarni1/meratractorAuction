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
  CountBtn,
} from "../StyledComp.js"
import { Route, Switch, Link, Redirect } from "react-router-dom"
import styled from "styled-components"
import MenuBarDemo from "../Components/MenuBar"
import Footer from "../Components/Footer"
import { Scrollbars } from "react-custom-scrollbars"
import { Button, Modal,Header,Form ,Icon} from "semantic-ui-react"
import { numWords } from "../Helper"
import escapeRegExp from "escape-string-regexp"
import './card.css'
import Select from 'react-select'
import _ from "lodash"



class CardDetails extends Component {
  state = {
    redirectTo: "",
    cart: {},
    auctionDetails: [],
    auctionImg: [],
    image: "",
    bidPrice: "",
    msg: "",
    count: "",
    bidCount: 0,
    refreshCount: 0,
    loading: false,
    userId:"",
    name:[],year:[],refno:[],

    trName:'',
    trefno:'',
    tyear:'',
    query:"",
    TractorName:[],
    TractorRef:[],
    TractorYear:[],
    tracTordata:[],
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
    isLoading:false,
    tsearch:'',
    TractorSearch:[],
    SelectedResult:{},
    value:'',
    results:[]
  }


  



 async componentDidMount() {
    // console.log("this.props.location.state.cart",this.props.location.state.cart)
    // console.log("id", this.props.location.state.id)
    let userId = await sessionStorage.getItem("loginId")
    let cartSelected = await JSON.parse(sessionStorage.getItem('cart'))

    console.log("card selcted",cartSelected)

    //console.log("user id",this.props.location.state)
    
      this.getCount(userId)
      this.setState({userId,cart:cartSelected})
    
    this.callTractor(cartSelected)

    let interval = 2000
    let startInterval = setInterval(() => {
      //console.log("start interval run..",this.state.refreshCount)
      // if (this.state.refreshCount < 12) {
        this.callTractor(cartSelected)
        this.setState({ refreshCount: this.state.refreshCount + 1 })
        
      // } else {
      //   this.stopInterval(startInterval)
      // }
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
    fetch(
      "http://35.161.99.113:9000/webapi/meratractor/auction/getauctionDetails",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auction_id: cart.auction_id
        })
      }
    )
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("data", data.records)

        if (data.records) {
          //this.setState({ auctionDetails: data.records })
          auctionDetails = data.records
          fetch(
            "http://35.161.99.113:9000/webapi/meratractor/auction/getLink",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                auction_id: cart.auction_id
              })
            }
          )
            .then(data => {
              return data.json()
            })
            .then(data => {
              console.log("data", data.records)

              let tractorArray = auctionDetails.map(item => {
                item.images = []
                return item
              })

              this.pushImages(data.records, tractorArray)

              //this.setState({ auctionImg: data.records })
            })
        } else {
          this.setState({ msg: "No tractor to show" })
        }
      })

    //this.getCount()
  }

  pushImages = (imageArray = [], tractorArray) => {
    // let tractorArray = this.state.auctionDetails.map(item => {
    //   item.images = []
    //   return item
    // })

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

   this.state.auctionDetails=tractorArray 

    this.setState({ auctionDetails: tractorArray})
    console.log("tractorArray", tractorArray)



//     let tractorname =[]

//   tractorArray.map(i=>{
//       let tname= i.description.split("-")
//       tractorname.push({"name":tname})
//     })
  
//     console.log('tractorname:', tractorname)

//     let trname = []
    
//     let tryear = []
  
//     let trefno=[]
//     let location=[]


// for(let i=0;i<tractorname.length;i++){
//   console.log(tractorname[i].name[0])
//   trname.push(tractorname[i].name[0])
//   trefno.push(tractorname[i].name[1])
//   tryear.push(tractorname[i].name[2])

// }

// console.log('trname:', trname)
// console.log('trregno:', trefno)
// console.log('tryear:', tryear)


// this.setState({name:trname,
//               year:tryear,
//               refno:trefno

// })


// console.log('trname:', trname)


  }



  openImg = images => {
    //sessionStorage.setItem('images' ," ")
    //this.setState({ redirectTo: "/images",imgDetails: images })
    console.log("image array",images)
    let img= []
    img= images
   // this.setState({imageModel:true})
   sessionStorage.setItem('images' ,JSON.stringify(img))

    window.open("/images")
     
  }

  handlebid = e => {
    this.setState({ bidPrice: e.target.value })
    //console.log("targeted value", e.target.value)
  }

  empty = () => {
    console.log("inside empty")
    this.state.bidPrice = ""
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

  submit = res => {
    // console.log('inside function');
     console.log('res', res);
     //console.log('input value in submit', this.state.bidPrice);
    // this.setState({ loading: true })

    if (!this.state.bidPrice) {
      this.setState({ msg: "Please enter your bid" })
    } else {
      fetch("http://35.161.99.113:9000/webapi/meratractor/bid/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          auction_id: res.auction_id,
          auctiondetail_id: res.auctiondetail_id,
          user_id: this.state.userId,
          latestPrice:  this.state.bidPrice,
          bidPrice:this.state.bidPrice
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("data", data.records)
          this.empty()
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

              this.updateLatestPrice(max, res.auctiondetail_id, res.no_of_bids)
            })
        })
    }
  }

  updateLatestPrice = (max, id, bids) => {
    const newBids = parseInt(bids) + 1
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


  handelTractorRefNo=e=>{

    let refno=e.target.value
    let searchBasedname=[]

    this.setState({trefno:refno})


//     this.state.auctionDetails.map(i=>{
 
//  if(i.description.indexOf(refno) !== -1){
//    return searchBasedname.push(i)
//  }
//      //return i.description.indexOf(name) !== -1
    
//     })
 
    // this.setState({trefno:refno,TractorRef:searchBasedname})
   }

  handelTractorYear=e=>{

    let year = e.target.value
    let searchBasedname=[]
    this.setState({tyear: year})

//     this.state.auctionDetails.map(i=>{
 
//  if(i.description.indexOf(year) !== -1){
//    return searchBasedname.push(i)
//  }
//      //return i.description.indexOf(name) !== -1
    
//     })
 
//      this.setState({tyear: e.target.value,TractorYear:searchBasedname})
   }





  handleTractorName=e=>{

    let name=e.target.value

    console.log("name",name)

    this.setState({trName:name})

    let searchBasedname=[]

//    this.state.auctionDetails.map(i=>{

// if(i.description.indexOf(name) !== -1){
//   return searchBasedname.push(i)
// }
//     //return i.description.indexOf(name) !== -1
//     console.log(' i.description.indexOf(name) !== -1:',  i.description.indexOf(name) !== -1)
//     //  if(i.description.match(name)){
//     //  return i 
//     //  }
//       console.log('searchBasedname:', searchBasedname)

   
//    })

    //this.setState({trName:name,TractorName:searchBasedname})

  }


//   search=()=>{

//     let searchstring =' '
//     let test=''


//     if(this.state.trName.length > 0 ){
//       searchstring = this.state.trName+"-"
//     }

//     if(this.state.trefno.length >0){
//       searchstring = "-"+this.state.trefno
//     }

//     if(this.state.tyear.length > 0){
//       searchstring = "-"+this.state.tyear+"-"
//     }

//     if(this.state.trName.length > 0 && this.state.tyear.length > 0 && this.state.tyear.length > 0 ){
//       searchstring = this.state.trName+"-"+this.state.trefno+"-"+this.state.tyear
//     }

    

   



//     console.log("searchstring",searchstring)

//     let tsearch = []

//     this.state.auctionDetails.map(i=>{

//       if(i.description.includes(searchstring)){
//         tsearch.push(i)
//       }
//       // else {
//       //   if(i.description.includes(test)){
//       //     tsearch.push(i)
//       // }
//    // }

//   })
//    this.setState({tsearch:searchstring,TractorSearch:tsearch,trName:'',trefno:'',tyear:''})

  
// }


resetComponent = () => {
  this.setState({
    isLoading: false,
    results: [],
    value: "",
    
  
  })
}

handleResultSelect = (e, { result }) => {
  console.log("selcted result", result)

  this.setState({ value: result.name })
  this.setState({ SelectedResult: result })

}

handleSearchChange = (e, { value }) => {
  this.setState({ isLoading: true, value: value })

  if (value.length < 1) return this.resetComponent()

  const re = new RegExp(_.escapeRegExp(value), "i")
  const isMatch = result => re.test(result.description || result.refno )

  this.setState({
    isLoading: false,
    results: _.filter(this.state.auctionDetails, isMatch)
  })
}

updateQuery = query => {
  console.log("query", query)
  this.setState({ query: query })
}



  

  render() {
    let {
      cart,
      auctionDetails,
      auctionImg,
      image,
      redirectTo,
      bidPrice,
      msg,
      query,
      tracTordata:[],
      isSearchable,
      isDisabled,
      isRtl,
      isLoading,
      TractorSearch
    } = this.state


    let showingCard =auctionDetails

    if(query.length > 0){
     
      if (query.search(/[^a-z\w\sA-Z0-9]+/) === -1) {
        const match = new RegExp(escapeRegExp(query), "i")
        let Filtereduserdata = auctionDetails.filter(i => match.test(i.description))
        showingCard = Filtereduserdata
        console.log('if showingCard:', showingCard)
        
        if (showingCard.length == 0) {
          const match = new RegExp(escapeRegExp(query), "i")
          let Filtereduserdata = auctionDetails.filter(i => match.test(i.refno))
          showingCard = Filtereduserdata
          console.log('else showingCard:', showingCard)
        }

      }
        
      //  else{
     
       
       
      // }
    

    }

    // let clear=()=>{
      
    //   auctionDetails=this.state.tracTordata
    // }


    // if(this.state.trName.length > 0){
    //   auctionDetails = this.state.TractorName
    // }

    // if(this.state.trefno.length > 0){
    //   auctionDetails = this.state.TractorRef
    // }

    // if(this.state.tyear.length > 0){
    //   auctionDetails = this.state.TractorYear
    // }

    // if(this.state.tsearch.length > 0){
    //   auctionDetails = this.state.TractorSearch
    // }
    
    if (redirectTo) {
      return (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { images: this.state.imgDetails }
           
          }}
          push
        />
      )
    }

    return (
      <div>
        <MenuBarDemo
          count={this.state.bidCount}
          id={this.state.userId}
        />
        <br />
        <Scrollbars style={{ display: "flex", flex: 1, height: 804 }}>
          <PageContainer>
            <br />
            <HeadingText>Details</HeadingText>

            <RedDiv />



        

            <Form>
                            <Form.Group widths="equal">
                              <Form.Field>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Search Tractor"
                                  value={query}
                                  onChange={event =>
                                    this.updateQuery(event.target.value)
                                  }
                                  icon='search'

                                  style={{    
                                    borderRadius: "25px",
                                    padding: "20px",
                                    width: "200px",
                                    height: "15px"
                                  }}
                                  />
                               
                              </Form.Field>
                            </Form.Group>
                          </Form>




            <FlexRow2>
              {showingCard.map(res => (
                <div>

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
                        res.images[0] && res.images[0].link
                          ? res.images[0].link
                          : "/images/no_image_750.jpg"
                        }
                        onClick1={() => this.openImg(res.images)}
                        onClick={() => this.submit(res)}
        />
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

      //this.props.onClick()
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
      amountInWords = numWords(this.input.value)
    }


    console.log('this.props.img1', this.props.img1);

    let text = this.props.text




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
          boxShadow: "0px 0px 5px 2px rgba(31,30,30,0.6)",
           flex: "0 0 25em"
        }}
      >
        <CountBtn>
          <span
            style={{
              fontWeight: 600,
              fontSize: 18
            }}
          >
            {/* Hurry!!! Current Bid Count- {this.props.no_of_bids} */}
            No of Bids: {this.props.no_of_bids}
          </span>
        </CountBtn>
        {/* <CardImg>
        <img src={props.number} alt="Paris" />
     </CardImg>*/}

        <img
          src={this.props.img1}
          alt="Tractor"
          width="300"
          height="100"
          onClick={this.props.onClick1}
        />


{/* <div style={{display:'flex'}}>

<div > */}
        <p style={{ fontWeight: 300, color: "palevioletred", }}>
          <b>{this.props.text}</b> 
        </p>
        {/* </div>
        <div style={{flex:1}}></div>

        <div style={{flex:1}}></div> */}
{/* </div> */}
        


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
            <span><b>{this.props.start}</b></span>
            <span><b>{this.props.bid}</b></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span><b>{this.props.actual}</b></span>
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
                value={this.props.bidPrice}
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
        <span>
          <font color="red">{this.state.warning}</font>
        </span>

        <Modal size={size} open={this.state.open} onClose={this.close}>
          <Modal.Content>
            <p>
              Are you sure you want to submit a bid of value Rs.
            {this.input.value}
              <br />
              <span className='changefont' >{amountInWords}</span>
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

      //this.props.onClick()
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
        <p style={{ flex: 1 ,textAlign:'left'}} className="card-text">
          <span style={{ fontSize: 14 ,}}>{this.props.title}</span>
       
        </p>
        <div style={{ display: "flex" }}>
          <p style={{ flex: 1 }} className="card-text">
            <span style={{ fontSize: 14 }}>Latest Bid:</span>
            <br />
            <span style={{ fontWeight: "bold", fontSize: 24 }}>₹ {this.props.latest}</span>
          </p>
          <p style={{ flex: 1 }} className="card-text">
            <span style={{ fontSize: 14 }}>No .of Bid:</span>
            <br />
            <span
              style={{ fontWeight: "bold", fontSize: 24, color: "#3A7FB4" }}
            >
           {this.props.no_of_bids}
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
          <a style={{ flex: 1 }} className="btn btn-primary"   onClick={() => this.submitBidClicked("mini")}>
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


  

        <Modal style={{width:"70%",height:'200px',margin:"20%",marginTop:"20%"}} size="mini" open={this.state.open} onClose={this.close}>
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
}

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


const resultRenderer = ({ description, refno }) => (
  <span>
    <Header as="h4">{refno}</Header>
    <p>{description}</p>
  </span>
)


export default CardDetails
