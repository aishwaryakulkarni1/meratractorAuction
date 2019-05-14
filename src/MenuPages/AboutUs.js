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

class AboutUs extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div>
        <MenuBarDemo id={this.props.location.state}/>
        <br />
        <Scrollbars style={{ display: "flex", flex: 1, height: 799 }}>
        <PageContainer>
        <br/>
          <HeadingText>ABOUT US</HeadingText>
          <RedDiv />
          <br />
          <h3>
            "The Old Order Changeth yeilding place to the New. Time for Change
            has come, the Time is Now"
          </h3>
          <br />
          <TextLeft> - Anonymous</TextLeft> <br />
         
          <ul>
            <li>This is an effort to help Dealers, Farmers and Agents come
            together on a common platform  and engage in getting the best
            deals without having to travel across the state or the country.</li><br/>
            <li>The era of offline sale of Used Agricultural Equipment and absence
            of Rental Platforms for  farmers is the change that will build
            the new. With increase in cost of acquisition of a Tractor, 
            hiring or purchase of Old Machinery saves money and time.</li><br/>
            <li>We are a group of Agricultural Engineers and Farmers together for
            over 20 years and  with experince in all matters Tractor.</li><br/>
            <li> We promise to deliver the best of services and to keep on
            improving as we grow.</li><br/>
            
          </ul>

          <h3>We are Here to Stay, Come What May !!!</h3>
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

export default AboutUs
