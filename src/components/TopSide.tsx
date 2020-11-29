import styled from "styled-components";
import settings from "../static/img/settings.svg"
import {DialogSearchCountUsers, DialogSearchName} from "./DialogSearchItem";


const TopSideWrapper = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    border-bottom:1px solid #dddddd;
`
export const ImgBlock = styled.img`
    display: block;
    width: 32px;
    height: 32px;
`
export const ImgBlockPointer = styled(ImgBlock)`
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        background: #F3F7FF;
    }
`

const DialogInfoContainer = styled.div`
    padding: 18px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const DialogInfo = styled.div`
    display: flex;  
    justify-content: center;
    align-items: center;
    flex-direction: column;
`


export const TopSide = () => {
  return (
    <TopSideWrapper>
      <DialogInfoContainer>
        <div/>
        <DialogInfo>
          <DialogSearchName>
            asdsadasdasdsa
          </DialogSearchName>
          <DialogSearchCountUsers>
            11 участников
          </DialogSearchCountUsers>
        </DialogInfo>
        <ImgBlockPointer src={settings} alt="settings"/>
      </DialogInfoContainer>
    </TopSideWrapper>

  )
}