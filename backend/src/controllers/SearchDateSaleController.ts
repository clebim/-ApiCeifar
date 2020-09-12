import { Request, Response } from 'express';
import Knex from '../database/connection';
import * as Yup from 'yup';

interface User {
  id: number;
  email: string;
  admin: number;
}

interface Sale {
  id: number;
  money: number;
  credit_cart: number;
  debit_card: number;
  total: number;
  date: string;
  deleted: number;
}

class SearchDateController {
  async getSalefromDate(req: Request, res: Response) {
    const schema = Yup.object().shape({
      initial_date: Yup.string().required(),
      final_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userId = req.userId;

    const isAdmin: User = await Knex.where('id', userId)
      .select('id', 'email', 'admin')
      .first()
      .from('users');

    if (isAdmin?.admin === 0) {
      return res.status(401).json({ error: 'User is not admin' });
    }

    const { initial_date, final_date } = req.body;

    const searchSales: Sale[] = await Knex.whereBetween('date', [
      initial_date,
      final_date,
    ])
      .select(
        'id',
        'money',
        'credit_card',
        'debit_card',
        'total',
        'date',
        'deleted',
      )
      .from<Sale[]>('sales_of_the_day');

    return res.json(searchSales);
  }
}

export default new SearchDateController();
