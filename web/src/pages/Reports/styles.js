import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Content = styled.div`
  padding: 15px;
  align-self: center;
  background-color: #e5e6f0;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 10px;
  border-radius: 4px;

  p {
    font-size: 18px;
    font-weight: bold;
    color: #513612;
    margin-bottom: 20px;
  }

  form {
    label {
      font-size: 16px;
      color: #513612;
    }
    input {
      margin-right: 20px;
      color: #513612;
      border: 1px solid #513612;
      border-radius: 4px;
      padding: 4px;
    }
  }
`
export const ButtonForm = styled.button`
  margin-left: 25px;
  border: 0;
  justify-self: flex-end;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  color: #fff;
  background: #513612;
  transition: background 0.2s;
  :hover {
    background: ${lighten(0.05, '#513612')};
  }

  svg {
    align-self: center;
    margin-right: 10px;
  }
`
export const Data = styled.div`
  margin-top: 30px;

  span {
    display: block;
    font-size: 16px;
    margin: 6px 0;
  }
`
