/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../services/api'
import {
  Container,
  Left,
  Right,
  Item,
  HeaderItem,
  ButtonItem,
  ItemContent
} from './styles'
import Header from '../../components/Header/index'

function Payments() {
  const [payments, setPayments] = useState([])
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    async function handleLoadingSales() {
      const response = await api.get('/payments')
      setPayments(response.data)
    }
    handleLoadingSales()
  }, [])

  async function handleDelete(id) {
    await api.delete(`/payments/${id}`)
    setPayments(
      payments.map(payment =>
        payment.id === id
          ? {
              ...payment,
              deleted: 1
            }
          : payment
      )
    )
  }

  async function handleCreatePayment(e) {
    e.preventDefault()

    const model = {
      value: value,
      description: description,
      pay_day: date
    }
    const schema = Yup.object().shape({
      value: Yup.string().required(),
      description: Yup.string().required(),
      pay_day: Yup.date().required()
    })
    if ((await schema.isValid(model)) && Number(value)) {
      try {
        const response = await api.post('/payments', model)
        setPayments([response.data, ...payments])
        toast.success('Pagamento Cadastrado')
      } catch (error) {
        toast.error(error)
      }
    } else {
      toast.error('Dados inválidos, insira os dados corretamente')
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Left>
          <form onSubmit={handleCreatePayment}>
            <label>Valor do pagamento</label>
            <input
              type="text"
              placeholder="100.00"
              name="value_payment"
              required
              onChange={e => setValue(e.target.value)}
            />
            <label>Descriçao do pagamento</label>
            <input
              type="text"
              placeholder="Digite a descrição, Ex: Coca Cola"
              name="description_payment"
              required
              onChange={e => setDescription(e.target.value)}
            />
            <label>Data do pagamento</label>
            <input
              type="date"
              name="date_payment"
              required
              onChange={e => setDate(e.target.value)}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </Left>
        <Right>
          <ul>
            {payments.map(payment => (
              <li key={payment.id}>
                <Item deleted={payment.deleted}>
                  <HeaderItem>
                    <span>Pagament:</span>
                    <ButtonItem
                      disabled={payment.deleted !== 0}
                      onClick={() => handleDelete(payment.id)}
                    >
                      <FaTrash size={16} color="#DE3B3B" />
                    </ButtonItem>
                  </HeaderItem>
                  <ItemContent>
                    <span>Valor: R$ {payment.value}</span>
                    <span>Descrição de pagamento: {payment.description}</span>
                    <span>Data do pagamento: {payment.pay_day}</span>
                  </ItemContent>
                </Item>
              </li>
            ))}
          </ul>
        </Right>
      </Container>
    </>
  )
}

export default Payments