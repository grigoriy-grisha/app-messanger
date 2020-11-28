import styled from "styled-components";
import message from "../static/img/message.svg"
import chat from "../static/img/chat.svg"

import {DialogSearchCountUsers, DialogSearchName} from "./DialogSearchItem";

const ListsDialogsAndContactContainer = styled.div`
  display: flex;
  align-items: center;
  width: 381px;
  border-right:1px solid #dddddd;
`

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  width: 50%;
  transition: 0.1s; 
  cursor:pointer;
  padding: 6px;
  &:hover {
    background: #F3F7FF;
  }
`
const TopSideStyle = styled.div`
    width: 100%;
    height: 7vh;
    display: flex;
    border-bottom:1px solid #dddddd;
`
export const ImgBlock = styled.img`
    width: 25px;
    height: 25px;
    display: block;
    padding: 15px;
`


const DialogInfoContainer = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
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
    <TopSideStyle>
      <ListsDialogsAndContactContainer>
        <List>
          <ImgBlock src={message} alt="message"/>
          Список Диалогов
        </List>
        <List>
          <ImgBlock src={chat} alt="chat"/>
          Мои диалоги
        </List>
      </ListsDialogsAndContactContainer>

      <DialogInfoContainer>
        <DialogInfo>
          <DialogSearchName>
            asdsadasdasdsa
          </DialogSearchName>
          <DialogSearchCountUsers>
            11 участников
          </DialogSearchCountUsers>
        </DialogInfo>
      </DialogInfoContainer>
    </TopSideStyle>

  )
}