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
import { Route, Switch, Link, Redirect } from "react-router-dom"
import styled from "styled-components"

import { Scrollbars } from "react-custom-scrollbars"
import RawCarousel from "./RawCarousel"

class CardImage extends Component {
  state = {
    ImageData:[]
  }


auctionIdBasedImages = (res) =>{

  let temp = []

  fetch(
    "http://35.161.99.113:9000/webapi/meratractor/auction/getLinkByauctionDetails",
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
      console.log("image api ", data.records)
      let linkarray = data.records 

      linkarray.map(i=>{
        if(i.link){
          temp.push({'link':i.link})
        }
      })

console.log('array of link my bid',temp)
this.setState({ImageData:temp})
})
}

  componentDidMount() {

    // console.log(this.props.location.state.images)


   
    if(JSON.parse(sessionStorage.getItem('images')) ==  null){
      console.log("no img")
    }else{
      let images=JSON.parse(sessionStorage.getItem('images'))
      console.log('images Data:', images)
      // console.log(this.props.location.state.images)
      this.setState({ImageData:images})

    }



if(sessionStorage.getItem('mybid') || JSON.parse(sessionStorage.getItem('MyBidImages'))  ==  null ||undefined ){
      console.log("no img")
    }else{
      let images=JSON.parse(sessionStorage.getItem('MyBidImages'))
      console.log('my bid Data:', images)
this.setState({ImageData:[]})
      this.auctionIdBasedImages(images)
      // console.log(this.props.location.state.images)
      
    }

  }

  render() {
    let { ImageData } = this.state

    return (
      <div
        style={{
          margin: "20px 30px"
        }}
      >
        <RawCarousel
          imageData={(ImageData && ImageData.length >= 0 && ImageData) || []}
        />
      </div>
    )
  }
}

// const ImageHolder = props => {
//   return <img src={props.img} height="800" />
// }

export default CardImage
