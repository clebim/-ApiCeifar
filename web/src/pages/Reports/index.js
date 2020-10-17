import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import api from '../../services/api'
import { format, parseISO } from 'date-fns'

import {
  Container,
  Content,
  ButtonForm,
  Data,
  ListItems,
  HeaderItem,
  ItemContent,
  Item,
  Title
} from './styles'
import Header from '../../components/Header/index'

function Reports() {
  const [initial_date_form, setInitial_date_form] = useState('')
  const [final_date_form, setFinal_date_form] = useState('')
  const [initial_date, setInitial_date] = useState('')
  const [final_date, setFinal_date] = useState('')
  const [cashSales, setCashSales] = useState('')
  const [sales_credit_card, setSales_credit_card] = useState('')
  const [sales_debit_card, setSales_debit_card] = useState('')
  const [month_payments, setMonth_payments] = useState('')
  const [sales_amount, setSales_amount] = useState('')
  const [profit, setProfit] = useState('')
  const [sales, setSales] = useState([])
  const [payments, setPayments] = useState([])

  async function handleReport(event) {
    event.preventDefault()
    console.log(initial_date_form)
    try {
      const model = {
        initial_date: initial_date_form,
        final_date: final_date_form
      }

      const schema = Yup.object().shape({
        initial_date: Yup.string().required().max(10),
        final_date: Yup.string().required().max(10)
      })

      if (await schema.isValid(model)) {
        const response = await api.post('/reports', {
          initial_date: initial_date_form,
          final_date: final_date_form
        })
        console.log(response.data.report)
        setInitial_date_form('')
        setFinal_date_form('')
        setInitial_date(response.data.report.initial_date)
        setFinal_date(response.data.report.final_date)
        setCashSales(response.data.report.cashSales)
        setSales_credit_card(response.data.report.sales_credit_card)
        setSales_debit_card(response.data.report.sales_debit_card)
        setMonth_payments(response.data.report.month_payments)
        setSales_amount(response.data.report.sales_amount)
        setProfit(response.data.report.profit)
        setSales(response.data.sales)
        setPayments(response.data.payments)
        toast.success('Relatório gerado com sucesso')
      } else {
        toast.error('Entrada de dados inválida')
      }
    } catch (error) {
      console.log(error)
      toast.error('Falha ao gerar relatório. Dados inválidos')
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <p>Relatórios da empresa:</p>
          <form onSubmit={handleReport}>
            <div>
              <label>Data inicial:</label>
              <input
                type="date"
                name="initial_date"
                required
                value={initial_date_form}
                onChange={e => setInitial_date_form(e.target.value)}
              />
              <label>Data final:</label>
              <input
                type="date"
                name="final_date"
                required
                value={final_date_form}
                onChange={e => setFinal_date_form(e.target.value)}
              />
            </div>

            <div>
              <ButtonForm type="submit">
                <FaSearch size={16} color="#FFFFFF" />
                Pesquisar
              </ButtonForm>
            </div>
          </form>

          {initial_date !== '' && (
            <Data>
              <p>Resultados da pesquisa:</p>
              <span>Data Inicial: {initial_date}</span>
              <span>Data Final: {final_date}</span>
              <span>Total de vendas em dinheiro: R${cashSales}</span>
              <span>
                Total de vendas no cartão de crédito: R${sales_credit_card}
              </span>
              <span>
                Total de vendas no cartão de débito: R${sales_debit_card}
              </span>
              <span>Total de vendas no mês: R${sales_amount}</span>
              <span>Total de gasto com pagamentos: R${month_payments}</span>
              <span>Lucro obtido: R${profit}</span>
            </Data>
          )}
        </Content>
        <ListItems>
          {sales.length !== 0 && (
            <Title>
              <h1>Vendas no período</h1>
            </Title>
          )}
          <ul>
            {sales.map(sale => (
              <li key={sale.id}>
                <Item>
                  <HeaderItem>
                    <span>Venda:</span>
                  </HeaderItem>
                  <ItemContent>
                    <span>Dinheiro: R$ {sale.money}</span>
                    <span>Cartão de crédito: R$ {sale.credit_card}</span>
                    <span>Cartão de débito: R$ {sale.debit_card}</span>
                    <span>Total: {sale.total}</span>
                    <span>
                      Data: {format(parseISO(sale.date), 'dd/MM/yyyy')}
                    </span>
                  </ItemContent>
                </Item>
              </li>
            ))}
          </ul>
        </ListItems>

        <ListItems>
          {payments.length !== 0 && (
            <Title>
              <h1>Pagamentos no período</h1>
            </Title>
          )}
          <ul>
            {payments.map(payment => (
              <li key={payment.id}>
                <Item>
                  <HeaderItem>
                    <span>Pagamento:</span>
                  </HeaderItem>
                  <ItemContent>
                    <span>Valor: R$ {payment.value}</span>
                    <span>Descrição: R$ {payment.credit_card}</span>
                    <span>
                      Data do pagamento:
                      {format(parseISO(payment.pay_day), ' dd/MM/yyyy')}
                    </span>
                  </ItemContent>
                </Item>
              </li>
            ))}
          </ul>
        </ListItems>
      </Container>
    </>
  )
}

export default Reports
