import styled from "styled-components"

export const PageContainer = styled.div`
  width: 100vw;
  display: flex;
  //margin-top: 10px;
  flex-direction: column;
  align-items: center;
`
export const CircleMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
`

export const CircleDiv = styled.div`
  width: 140px;
  height: 140px;
  border: 2px solid #bdbdbd;
  border-radius: 50%;
  //border-radius: ${props => (props.square ? "8px" : "50%")}; 
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CartCircleDiv = styled.div`
  width: 26px;
  height: 26px;
  border: 1px solid #111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left:6px;
  background-color:#111;
  color:#fff;
`

export const HeadingText = styled.span`
  align-items: center;
  font-size: 32px;
  font-weight: 600;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  padding: 12px;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`

export const FlexRow2 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 12px;
`

export const RedDiv = styled.div`
  margin: 30px;
  height: 2px;
  background-color: palevioletred;
  width: 80px;
`

export const MenuRow = styled.div`
  flex-direction: row;
  display: flex;
  background: papayawhip;
`
export const Row = styled.div`
  flex-direction: row;
  display: flex;
`

export const MenuItem = styled.span`
  padding: 16px;
  &:hover {
    background-color: palevioletred;
  }
  transition: background-color 0.5s;
  cursor: pointer;
  display: ${props => (props.mobileOnly ? "none" : "inline")};
  @media (max-width: 600px) {
    display: ${props => (props.mobileOnly ? "inline" : "none")};
  }
`

export const Spacer = styled.div`
  flex: 1;
`

export const CollapsibleSidebar = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 200px;
  left: ${props => (props.open ? "0px" : "-200px")};
  background: papayawhip;
  transition: left 0.5s;
  z-index : 10;
`

export const CardDiv = styled.div`
  disply: flex;
  max-width: 900px;
  width: 100%;
  height: 100px;
  &:hover {
    background-color: palevioletred;
    color: #fff;
    box-shadow: 0px 0px 5px 4px rgba(31, 30, 30, 0.6);
  }
  transition: background-color 1s, box-shadow 0.25s;
  box-shadow: 0px 0px 5px 2px rgba(31, 30, 30, 0.6);
  padding: 12px;
`

export const FlexCardRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 720px) {
    flex-direction: column;
    font-size:18px;
  }
`

export const FooterRow = styled.div`
  flex-direction: row;
  display: flex;
  background: #9e9e9e;
  color: #fff;
  padding: 16px;
  @media (max-width: 600px) {
    flex-direction: column;
    font-size:18px;

  }
`

export const CardImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin:12px;
`

export const CountBtn = styled.div`
display:flex;
width:100%;
padding:12px;
background-color:green;
color:#fff;`

export const CircleDiv1 = styled.div`
  width: 250px;
  height: 210px;
  border: 2px solid #bdbdbd;
  border-radius: 50%;
  //border-radius: ${props => (props.square ? "8px" : "50%")}; 
  display: flex;
  align-items: center;
  justify-content: center;
`
