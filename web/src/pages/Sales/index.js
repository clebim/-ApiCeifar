import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../services/api'
import {
  Container,
  Content,
  Item,
  HeaderItem,
  ItemContent,
  Form,
  ButtonForm
} from './styles'
import Header from '../../components/Header/index'

function Sales() {
  const [sales, setSales] = useState([])
  const [initial_date, setInitial_date] = useState('')
  const [final_date, setFinal_date] = useState('')

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

  async function handleSearchSales(event) {
    event.preventDefault()
    try {
      const model = {
        initial_date: initial_date,
        final_date: final_date
      }

      const schema = Yup.object().shape({
        initial_date: Yup.string().required().max(10),
        final_date: Yup.string().required().max(10)
      })

      if (await schema.isValid(model)) {
        const response = await api.post('/search_sales', {
          initial_date,
          final_date
        })

        setSales(response.data)
        setInitial_date('')
        setFinal_date('')

        if (response.data.length === 0) {
          toast.success('Não há dados durante este período')
        } else {
          toast.success('Pesquisa feita com sucesso')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Falha ao fazer pesquisa. Dados inválidos')
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Form>
          <form onSubmit={handleSearchSales}>
            <label>Data inicial:</label>
            <input
              type="date"
              name="initial_date"
              required
              value={initial_date}
              onChange={e => setInitial_date(e.target.value)}
            />
            <label>Data final:</label>
            <input
              type="date"
              name="final_date"
              required
              value={final_date}
              onChange={e => setFinal_date(e.target.value)}
            />

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
