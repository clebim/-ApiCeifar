import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.header`
  width: 100%;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  background-color: #e5e6f0;
`
export const Logo = styled.div`
  display: flex;
  margin: 0 20px;
  font-size: 26px;
  text-align: center;
  a {
    margin-left: 15px;
    text-decoration: none;
    color: #513612;
  }
`

export const Left = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`

export const Options = styled.ul`
  list-style: none;
  margin-left: 60px;
  display: flex;
  flex-direction: row;
`

export const Option = styled.li`
  margin: 0 10px;
  a {
    font-weight: bold;
    color: #513612;
    transition: color 0.2s;
    :hover {
      color: ${lighten(0.2, '#513612')};
    }
  }
`
export const Right = styled.div`
  padding-right: 10px;
`
export const Button = styled.button`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  color: #513612;
  background: #e5e6f0;
  border: 0;
`
