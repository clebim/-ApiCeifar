import { Request, Response } from 'express';
import knex from '../database/connection';
import * as Yup from 'yup';
import { parseISO, format } from 'date-fns';

interface SaleOfTheDay {
  id: number;
  money: number;
  credit_card: number;
  debit_card: number;
  date: string;
}

interface PaymentDay {
  id: number;
  value: number;
  description: string;
  pay_day: string;
}

interface Report {
  initial_date: string;
  final_date: string;
  cashSales: number;
  sales_credit_card: number;
  sales_debit_card: number;
  month_payments: number;
  sales_amount: number;
  profit: number;
}

class ReportsController {
  async index(req: Request, res: Response) {
    const schema = Yup.object().shape({
      initial_date: Yup.string().max(10).required(),
      final_date: Yup.string().max(10).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { initial_date, final_date } = req.body;

    const sales: SaleOfTheDay[] = await knex
      .whereBetween('date', [initial_date, final_date])
      .whereNot('deleted', 1)
      .select('id', 'money', 'credit_card', 'debit_card', 'total', 'date')
      .orderBy('date')
      .from('sales_of_the_day');

    const payments: PaymentDay[] = await knex
      .whereBetween('pay_day', [initial_date, final_date])
      .whereNot('deleted', 1)
      .select('id', 'value', 'description', 'pay_day')
      .orderBy('pay_day')
      .from('payments');

    var cashSales = 0;
    var sales_credit_card = 0;
    var sales_debit_card = 0;
    var month_payments = 0;
    var sales_amount = 0;
    var profit = 0;

    if (!(sales.length === 0)) {
      for (var i = 0; i < sales.length; i++) {
        cashSales = cashSales + sales[i].money;
        sales_credit_card = sales_credit_card + sales[i].credit_card;
        sales_debit_card = sales_debit_card + sales[i].debit_card;
        sales_amount = cashSales + sales_credit_card + sales_debit_card;
      }
    }

    if (!(payments.length === 0)) {
      for (var j = 0; j < payments.length; j++) {
        month_payments = month_payments + payments[j].value;
      }
    }

    profit = sales_amount - month_payments;

    const report = {
      report: {
        initial_date: format(parseISO(initial_date), 'dd/MM/yyyy'),
        final_date: format(parseISO(final_date), 'dd/MM/yyyy'),
        cashSales: cashSales,
        sales_credit_card: sales_credit_card,
        sales_debit_card: sales_debit_card,
        month_payments: month_payments,
        sales_amount: sales_amount,
        profit: profit,
      },
      sales: sales,
      payments: payments,
    };

    return res.json(report);
  }
}

export default new ReportsController();
