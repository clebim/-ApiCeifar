import styled from 'styled-components'
import { darken, lighten } from 'polished'

export const Body = styled.div`
  position: relative;
  z-index: 1;
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const Left = styled.div`
  width: 100%;
  max-width: 360px;
  background: #e5e6f0;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    border: 0;
    padding: 20px 30px;

    label {
      margin: 10px 0;
      font-size: 18px;
      color: #513612;
    }
    input {
      background: #fff;
      border-radius: 4px;
      border: 1px solid #513612;
      height: 30px;
      padding: 0 10px;
      &::placeholder {
        color: #999;
      }
    }
    button {
      height: 40px;
      border-radius: 4px;
      border: 0;
      background: #513612;
      color: #fff;
      margin-top: 10px;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 1px;
      transition: background 0.2s;
      :hover {
        background: ${lighten(0.05, '#513612')};
      }
    }
  }
`

export const Select = styled.div`
  display: flex;
  flex-direction: column;
`
export const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    padding-left: 10px;
    margin: 0;
  }
`

export const Right = styled.div`
  background: none;
  flex: 1;
  margin-left: 60px;
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    list-style: none;
  }
  @media (max-width: 800px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
  height: 75vh;
  overflow-y: scroll;
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
  margin-top: 15px;
  span {
    font-size: 16px;
    display: block;
    color: #513612;
  }
`
export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 30px 20px 30px;

  button {
    height: 40px;
    border-radius: 4px;
    border: 0;
    background: #513612;
    color: #fff;
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 1px;
    transition: background 0.2s;
    :hover {
      background: ${lighten(0.05, '#513612')};
    }
  }

  #caixa {
    margin-right: 10px;
    font-size: 16px;
    letter-spacing: 0;
    background: #0d730d;
    transition: background 0.2s;
    :hover {
      background: ${darken(0.05, '#0d730d')};
    }
  }

  #vendas {
    background: #e69e19;
    margin-left: 10px;
    font-size: 16px;
    letter-spacing: 0;
    transition: background 0.2s;
    :hover {
      background: ${darken(0.05, '#e69e19')};
    }
  }
`
