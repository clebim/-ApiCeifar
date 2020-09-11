import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const Content = styled.div`
  background: none;
  align-self: center;
  flex: 1;
  width: 60%;
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    list-style: none;
  }
  @media (max-width: 600px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
`
export const Item = styled.div`
  background: #e5e6f0;
  opacity: ${props => (props.deleted === 0 ? 1 : 0.5)};
  padding: 10px;
  border-radius: 4px;
`

export const HeaderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 18px;
    color: #513612;
  }
`
export const ButtonItem = styled.button`
  border: 0;
  background: none;
  cursor: ${props => (props.disabled === 0 ? 'pointer' : 'default')};
`
export const ItemContent = styled.div`
  margin-top: 10px;
  span {
    font-size: 16px;
    display: block;
    color: #513612;
  }
`
export const Form = styled.div`
  padding: 15px;
  align-self: center;
  background-color: #e5e6f0;
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-bottom: 10px;
  border-radius: 4px;

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
  margin-left: 70px;
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
