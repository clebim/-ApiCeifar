/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

import api from '../../services/api'
import Header from '../../components/Header/index'
import CloseBox from '../../components/CloseBox/index'
import {
  Container,
  Option,
  Left,
  Right,
  Select,
  HeaderItem,
  Item,
  ItemContent,
  Options,
  Body,
  ButtonItem
} from './styles'

export default function Home() {
  const [visible, setVisible] = useState(false)
  const [sales, setSales] = useState([])
  const [method, setMethod] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    async function handleLoadingSales() {
      const response = await api.get('/sales')
      setSales(response.data)
    }
    handleLoadingSales()
  }, [])

  async function handleDelete(id) {
    await api.delete(`/sales/${id}`)
    setSales(
      sales.map(sale =>
        sale.id === id
          ? {
              ...sale,
              deleted: 1
            }
          : sale
      )
    )
  }

  async function handleCreateSale(e) {
    e.preventDefault()
    if (Number(value) && method !== '') {
      try {
        const response = await api.post('/sales', { value, method })
        setSales([response.data, ...sales])
        setValue('')
        toast.success('Venda Cadastrada')
      } catch (error) {
        toast.error(error)
      }
    } else {
      toast.error('Entrada de dados inválida')
    }
  }

  function handleSetVisible() {
    setVisible(!visible)
  }

  return (
    <Body>
      <CloseBox visibleFull={visible} handleSetVisible={handleSetVisible} />
      <Header />
      <Container>
        <Left>
          <form onSubmit={handleCreateSale}>
            <label>Valor da venda</label>
            <input
              type="text"
              placeholder="Digite o valor, Ex: 5.00"
              value={value}
              name="valor_venda"
              required
              onChange={e => setValue(e.target.value)}
            />
            <label>Método de pagamento</label>
            <Select>
              <Option>
                <input
                  type="radio"
                  value="Dinheiro"
                  name="metodo"
                  onChange={e => setMethod(e.target.value)}
                />
                <label>Dinheiro</label>
              </Option>
              <Option>
                <input
                  type="radio"
                  value="Cartao de credito"
                  name="metodo"
                  onChange={e => setMethod(e.target.value)}
                />
                <label>Cartao de crédito</label>
              </Option>
              <Option>
                <input
                  type="radio"
                  value="Cartao de debito"
                  name="metodo"
                  onChange={e => setMethod(e.target.value)}
                />
                <label>Cartao de débito</label>
              </Option>
            </Select>
            <button type="submit">Cadastrar</button>
          </form>
          <Options>
            <button id="caixa" onClick={handleSetVisible}>
              Fechar caixa
            </button>
          </Options>
        </Left>
        <Right>
          <ul>
            {sales.map(sale => (
              <li key={sale.id}>
                <Item deleted={sale.deleted}>
                  <HeaderItem>
                    <span>Venda:</span>
                    <ButtonItem
                      onClick={() => handleDelete(sale.id)}
                      disabled={sale.deleted !== 0}
                    >
                      <FaTrash size={16} color="#DE3B3B" />
                    </ButtonItem>
                  </HeaderItem>
                  <ItemContent>
                    <span>Valor: R$ {sale.value}</span>
                    <span>Forma de pagamento: {sale.method}</span>
                  </ItemContent>
                </Item>
              </li>
            ))}
          </ul>
        </Right>
      </Container>
    </Body>
  )
}
