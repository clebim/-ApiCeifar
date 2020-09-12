import { Request, Response } from 'express';
import * as Yup from 'yup';

import knex from '../database/connection';

interface Payment {
  id: number;
  value: number;
  description: string;
  pay_day: string;
  deleted: number;
}

class PaymentsController {
  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      description: Yup.string().required(),
      pay_day: Yup.string().max(10).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { value, description, pay_day } = <Payment>req.body;

    const paymentId = await knex('payments').insert({
      value: value,
      description: description,
      pay_day: pay_day,
      deleted: false,
    });

    const model: Payment = {
      id: paymentId[0],
      value: value,
      description: description,
      pay_day: pay_day,
      deleted: 0,
    };

    return res.json(model);
  }

  async index(req: Request, res: Response) {
    const payments = await knex
      .select('id', 'value', 'description', 'pay_day', 'deleted')
      .limit(30)
      .from<Payment>('payments');

    return res.json(payments);
  }

  async delete(req: Request, res: Response) {
    const idPayment = req.params.id;

    const paymentExists = await knex('payments')
      .where('id', idPayment)
      .select('*')
      .first();

    if (!paymentExists) {
      return res.send(400).json({ error: 'Sale not exists' });
    }

    await knex('payments').where('id', idPayment).update({ deleted: true });

    return res.json({ ok: 'Sale deleted' });
  }
}

export default new PaymentsController();
