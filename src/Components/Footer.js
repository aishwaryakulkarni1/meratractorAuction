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

import { FooterRow, Spacer, Row } from "../StyledComp.js"

class Footer extends Component {
  render() {
    return (
      <div>
        <FooterRow mobile={window.innerWidth < 600 ? true : false}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 400
            }}
          >
          Office No 431, Sohrab Hall, Station Road, Pune- 411040
          </span>
          <Spacer />
          <Row>
            <form>
              <input
                type="text"
                placeholder="abc@gmail.com"
                style={{
                  padding: "5px",
                  border: "none",
                  borderRadius: 4,
                  marginRight: 8
                }}
              />
            </form>
            <button
              type="button"
              style={{
                backgroundColor: "palevioletred",
                padding: "5px",
                border: "1px solid palevioletred",
                color: "#fff",
                borderRadius: 4
              }}
            >
              Subscribe
            </button>
          </Row>
        </FooterRow>
      </div>
    )
  }
}

export default Footer
