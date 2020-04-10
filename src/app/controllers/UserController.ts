import * as Yup from 'yup';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../schemas/User';

interface UserBody {
  name: string,
  email: string,
  password: string,
}

interface UserCreate {
  _id: string,
}

class UserController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, password }: UserBody = req.body;

    const userExists = await User.find({ email });

    if (userExists.length !== 0) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const { _id }: UserCreate = await User
      .create({ name, email, password_hash: passwordHash });

    return res.json({ _id, name, email });
  }
}

export default new UserController();
