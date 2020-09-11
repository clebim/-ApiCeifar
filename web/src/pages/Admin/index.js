import React, { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'

import Header from '../../components/Header/index'
import {
  Container,
  ContainerForm,
  Form,
  Input,
  Label,
  Button,
  ContentForm
} from './styles'

function Admin() {
  const { admin, isAdmin } = useContext(AuthContext)

  function handleVerifyAdmin(event) {
    event.preventDefault()
    isAdmin()
  }

  return (
    <>
      <Header />

      {admin ? (
        <Container />
      ) : (
        <ContainerForm>
          <ContentForm>
            <Form onSubmit={handleVerifyAdmin}>
              <Label>Digite a senha de admin</Label>
              <Input placeholder="********" type="password" name="password" />
              <Button type="submit">Acessar</Button>
            </Form>
          </ContentForm>
        </ContainerForm>
      )}
    </>
  )
}

export default Admin
