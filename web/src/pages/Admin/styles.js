import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`
export const ContentForm = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;
`

export const ContainerForm = styled.div`
  height: 100%;
  display: flex;
  font-family: 'Roboto';
  font-weight: bold;
  justify-content: center;
  align-items: center;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 0;
`
export const Input = styled.input`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  height: 45px;
  padding: 0 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  &::placeholder {
    color: #999;
  }
`
export const Label = styled.label`
  color: #444444;
  font-size: 18px;
  font-weight: bold;
`
export const Button = styled.button`
  border: 0;
  border-radius: 4px;
  color: #fff;
  background: #513612;
  height: 45px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
  transition: background 0.2s;
  :hover {
    background: ${lighten(0.05, '#513612')};
  }
`
