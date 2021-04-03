import { Request, Response } from 'express';
import User from '../schemas/User';
import * as Yup from 'yup';

class LoginController {

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
      email: Yup.string().email().required(),
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

    if (userAlreadyExists) {
      return res.status(400).json({
        mensagem: 'User already registed'
      });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json(user);
  }
}

export { LoginController };
