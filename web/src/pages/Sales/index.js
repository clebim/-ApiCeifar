import React, { useState, useEffect } from 'react'
import { FaTrash, FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'

import api from '../../services/api'
import {
  Container,
  Content,
  Item,
  HeaderItem,
  ButtonItem,
  ItemContent,
  Form,
  ButtonForm
} from './styles'
import Header from '../../components/Header/index'

function Sales() {
  const [sales, setSales] = useState([])

  useEffect(() => {
    async function handleLoadingSales() {
      try {
        const response = await api.get('/sales_day')
        setSales(response.data)
      } catch (error) {
        console.log(error)
        toast.error('Erro ao carregar as vendas')
      }
    }
    handleLoadingSales()
  }, [])

  return (
    <>
      <Header />
      <Container>
        <Form>
          <form>
            <label>Data inicial:</label>
            <input type="date" name="initial_date" required />
            <label>Data final:</label>
            <input type="date" name="final_date" required />

            <ButtonForm type="submit">
              <FaSearch size={16} color="#FFFFFF" />
              Pesquisar
            </ButtonForm>
          </form>
        </Form>

        <Content>
          <ul>
            {sales.map(sale => (
              <li key={sale.id}>
                <Item deleted={sale.deleted}>
                  <HeaderItem>
                    <span>Venda:</span>
                    <ButtonItem
                      onClick={() => {}}
                      disabled={sale.deleted !== 0}
                    >
                      <FaTrash size={16} color="#DE3B3B" />
                    </ButtonItem>
                  </HeaderItem>
                  <ItemContent>
                    <span>Dinheiro {sale.money}</span>
                    <span>Cartão de crédito: {sale.credit_card}</span>
                    <span>Cartão de débito: {sale.debit_card}</span>
                    <span>total: {sale.total}</span>
                    <span>Data: {sale.date}</span>
                  </ItemContent>
                </Item>
              </li>
            ))}
          </ul>
        </Content>
      </Container>
    </>
  )
}

export default Sales
