import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../config/authConfig';

class GetNewTokenController {
  async store(req: Request, res: Response) {
    const oldToken = <string>req.headers.authorization;

    if (!oldToken) {
      return res.status(401).json({ error: 'token not provided' });
    }

    const [, token] = oldToken.split(' ');

    try {
      const decoded = <any>(
        await promisify(jwt.verify)(token, authConfig.secret)
      );

      const id = decoded.id;

      return res.json({
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(401).json({ error: 'token invalid' });
    }
  }
}

export default new GetNewTokenController();
