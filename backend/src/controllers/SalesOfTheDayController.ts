import * as Yup from 'yup';
import { formatISO } from 'date-fns';

import { Request, Response } from 'express';

import knex from '../database/connection';

interface Sales {
  money: number;
  credit_card: number;
  debit_card: number;
  date: Date;
  deleted: boolean;
}

class SalesOfTheDayController {
  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      money: Yup.number().required(),
      credit_card: Yup.number().required(),
      debit_card: Yup.number().required(),
      total: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { money, credit_card, debit_card, total } = req.body;

    const date = formatISO(new Date(), { representation: 'date' });

    const saleExists = await knex('sales_of_the_day')
      .where('date', date)
      .select('*')
      .first();

    if (saleExists) {
      return res.status(401).json({ error: 'Sale of the day already exists' });
    }

    const sales = await knex('sales_of_the_day').insert({
      money: money,
      credit_card: credit_card,
      debit_card: debit_card,
      total: total,
      date: date,
      deleted: false,
    });

    return res.json(sales);
  }

  async index(req: Request, res: Response) {
    const sales = await knex
      .select('*')
      .limit(30)
      .from<Sales>('sales_of_the_day');

    return res.json(sales);
  }

  async store(req: Request, res: Response) {
    const date = formatISO(new Date(), { representation: 'date' });

    const sales = await knex('sales')
      .where('date_of_sale', date)
      .whereNot('deleted', 1)
      .select('value', 'method');

    let totalmoney: number = 0;
    let credit_card: number = 0;
    let debit_card: number = 0;

    console.log(sales);

    sales.map(sale => {
      if (sale.method === 'Dinheiro') {
        totalmoney = totalmoney + sale.value;
      } else if (sale.method === 'Cartao de credito') {
        credit_card = credit_card + sale.value;
      } else if (sale.method === 'Cartao de debito') {
        debit_card = debit_card + sale.value;
      }
    });

    return res.json({
      money: totalmoney,
      credit_card: credit_card,
      debit_card: debit_card,
      total: totalmoney + credit_card + debit_card,
    });
  }

  async delete(req: Request, res: Response) {
    const idSale = req.params.id;

    const saleExists = await knex('sales_of_the_day')
      .where('id', idSale)
      .select('*')
      .first();

    if (!saleExists) {
      return res.send(400).json({ error: 'Sale not exists' });
    }

    await knex('sales_of_the_day')
      .where('id', idSale)
      .update({ deleted: true });

    return res.json({ ok: 'Sale deleted' });
  }
}

export default new SalesOfTheDayController();
