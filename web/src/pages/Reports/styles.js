import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`

export const Content = styled.div`
  padding: 15px;
  align-self: center;
  background-color: #e5e6f0;
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin-bottom: 10px;
  border-radius: 4px;

  p {
    font-size: 18px;
    font-weight: bold;
    color: #513612;
    margin-bottom: 20px;
  }

  form {
    display: flex;
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
    justify-content: space-between;
  }
`
export const ButtonForm = styled.button`
  margin-left: 25px;
  border: 0;
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
export const ListItems = styled.div`
  background: none;
  flex: 1;
  width: 1100px;
  align-self: center;
  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    list-style: none;
  }
  @media (max-width: 800px) {
    ul {
      grid-template-columns: 3fr;
    }
  }
`

export const Item = styled.div`
  background: #e5e6f0;
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
  margin-top: 15px;
  span {
    font-size: 16px;
    display: block;
    color: #513612;
  }
`

export const Title = styled.div`
  background: #e5e6f0;
  border-radius: 4px;
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  h1 {
    font-size: 24;
    color: #513612;
  }
`
