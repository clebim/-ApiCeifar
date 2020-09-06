import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdExitToApp } from 'react-icons/md'

import AuthContext from '../../contexts/AuthContext'
import { Container, Logo, Left, Right, Options, Option, Button } from './styles'

const Header = () => {
  const { signOut } = useContext(AuthContext)

  function handleLogaut() {
    signOut()
  }

  return (
    <Container>
      <Left>
        <Logo>
          <Link to="/home">Panificadora Ceifar</Link>
        </Logo>
        <Options>
          <Option>
            <Link to="/home">CAIXA</Link>
          </Option>
          <Option>
            <Link to="">VENDAS</Link>
          </Option>
          <Option>
            <Link to="/payments">PAGAMENTOS</Link>
          </Option>
          <Option>
            <Link to="">RELATÓRIOS</Link>
          </Option>
        </Options>
      </Left>
      <Right>
        <Button onClick={handleLogaut}>
          <MdExitToApp size={24} color="#513612" />
          Sair
        </Button>
      </Right>
    </Container>
  )
}

export default Header
