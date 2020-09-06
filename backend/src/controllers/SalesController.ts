import * as Yup from 'yup';
import { formatISO } from 'date-fns';

import { Request, Response } from 'express';

import knex from '../database/connection';

interface Sale {
  id: number;
  value: number;
  method: string;
  date_of_sale: string;
  deleted: number;
}

class SalesController {
  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      method: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { value, method } = req.body;

    const date = formatISO(new Date(), { representation: 'date' });

    const response = await knex('sales').insert({
      value: value,
      method: method,
      date_of_sale: date,
      deleted: false,
    });

    const model: Sale = {
      id: response[0],
      value: value,
      method: method,
      date_of_sale: date,
      deleted: 0,
    };

    return res.json(model);
  }

  async index(req: Request, res: Response) {
    const todayDate = formatISO(new Date(), { representation: 'date' });

    const salesOfDay = await knex
      .where('date_of_sale', todayDate)
      .select('id', 'value', 'method', 'date_of_sale', 'deleted')
      .orderBy('id', 'desc')
      .from<Sale>('sales');

    return res.json(salesOfDay);
  }

  async delete(req: Request, res: Response) {
    const idSale = req.params.id;

    const saleExists = await knex('sales')
      .where('id', idSale)
      .select('*')
      .first();

    if (!saleExists) {
      return res.send(400).json({ error: 'Sale not exists' });
    }

    await knex('sales').where('id', idSale).update({ deleted: true });

    return res.json({ ok: 'Sale deleted' });
  }
}

export default new SalesController();
