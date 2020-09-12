import React, { useState, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'

import { Container, Content, Address, Button, Top, ButtonClose } from './styles'
import api from '../../services/api'

function CloseBox({ visibleFull, handleSetVisible }) {
  const [money, setMoney] = useState(0)
  const [creditCard, setCreditCard] = useState(0)
  const [debitCard, setDebitCard] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function handleValues() {
      if (visibleFull === true) {
        const response = await api.get('/pre_sales_day')
        console.log(response.data)
        setMoney(Number(response.data.money))
        setCreditCard(Number(response.data.credit_card))
        setDebitCard(Number(response.data.debit_card))
        setTotal(Number(response.data.total))
      }
    }
    handleValues()
  }, [visibleFull])

  async function handleCreateSaleDay() {
    try {
      await api.post('/sales_day', {
        money: money,
        credit_card: creditCard,
        debit_card: debitCard,
        total: total
      })

      handleSetVisible()
      toast.success('Dia de vendas Cadastrado')
    } catch (error) {
      toast.error('Falha, dia de vendas ja foi registrado')
    }
  }

  return (
    <Container visible={visibleFull}>
      <Content>
        <Address>
          <Top>
            <h3>Informações da encomenda</h3>
            <ButtonClose onClick={handleSetVisible}>
              <MdClose size={20} color="#DE3B3B" />
            </ButtonClose>
          </Top>

          <span>Dinheiro R${money}</span>
          <span>Cartao de crédito: R${creditCard}</span>
          <span>Cartao de débito: R${debitCard}</span>
          <span>Total em vendas: R${total}</span>

          <Button onClick={handleCreateSaleDay}>Confirmar</Button>
        </Address>
      </Content>
    </Container>
  )
}

export default CloseBox
