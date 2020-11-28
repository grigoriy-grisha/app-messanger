import styled from "styled-components";
import message from "../static/img/message.svg"

const DialogSearchContainer = styled.div`
    width: 310px;
    padding: 10px 35px;
    transition: 0.1s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background: #F3F7FF;
    }
`

export const DialogSearchName = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #202020;
    padding: 3px;
`

export const DialogSearchCountUsers = styled.div`
    font-size: 14px;
    line-height: 16px;
    color: #cccccc;
    padding: 3px;
`

const DialogSearchIcon = styled.div`
    width: 23px;
    height: 23px;
`

export const DialogSearchItem = () => {
  return (
    <DialogSearchContainer>
      <div>
        <DialogSearchName>
          asdsadasdasdsa
        </DialogSearchName>
        <DialogSearchCountUsers>
          11 участников
        </DialogSearchCountUsers>
      </div>
      <DialogSearchIcon>
        <img src={message} alt="dialog"/>
      </DialogSearchIcon>
    </DialogSearchContainer>
  )
}