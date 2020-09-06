import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100%;
  display: ${props => (props.visible ? 'flex' : 'none')} !important ;
  justify-content: center;
  align-items: center;
  flex: 1;
`
export const Content = styled.div`
  display: flex;
  background-color: #fff;
  width: 450px;
  height: 210px;
  border-radius: 4px;
  flex-direction: column;
`
export const Address = styled.div`
  padding: 25px;
  h3 {
    padding-bottom: 10px;
    color: #444;
  }
  span {
    display: block;
    font-size: 14px;
    color: #666;
    padding: 2px 0;
  }
`
export const ButtonClose = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
`
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  background: #0d730d;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background 0.2s;
  :hover {
    background: ${darken(0.05, '#0d730d')};
  }
`
