import { Request, Response } from 'express';
import User from '../schemas/User';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

const saltRounds = 10;

class UserController {

  /**
   * Creates an user.
   * @param req the incoming request
   * @param res the reponse
   * @returns json with response
   */
  async create(req: Request, res: Response) {
    const { name, email, password, confirmPassword } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required().max(80),
      password: Yup.string().required().min(8),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match!')
    });

    const validate = await schema.isValid(req.body);

    if (! validate) {
      return res.status(400).json({
        mensagem: 'Invalid input schema'
      });
    }

    const userAlreadyExists = await User.find({ email: email });

    if (userAlreadyExists.length !== 0) {
      return res.status(400).json({
        mensagem: 'User already registed'
      });
    }

    try {
      const hash = await bcrypt.hash(password, saltRounds);

      await User.create({ name, email, password: hash });

      return res.status(201).json({
        mensagem: 'User created successfully!'
      });
    } catch(e) {
      return res.status(500).json({
        mensagem: 'Error'
      })
    }
  }

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}

	async index(req: Request, res: Response) {}

  async get(req: Request, res: Response) {}
}

export { UserController };
