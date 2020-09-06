import React, { useState, useContext } from 'react'
// import { MdLocalShipping } from 'react-icons/md'

import AuthContext from '../../contexts/AuthContext'
import { Container, Form, Input, Button, Label, Content, Logo } from './styles'

const Sign = () => {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event) {
    event.preventDefault()
    signIn(email, password)
  }

  return (
    <Container>
      <Content>
        <Logo>
          <p>Panificadora Ceifar</p>
        </Logo>
        <Form onSubmit={handleLogin}>
          <Label>Seu E-mail</Label>
          <Input
            placeholder="exemplo@gmail.com"
            type="email"
            value={email}
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Label>Sua Senha</Label>
          <Input
            placeholder="**********"
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit">Entrar no sistema</Button>
        </Form>
      </Content>
    </Container>
  )
}
export default Sign
