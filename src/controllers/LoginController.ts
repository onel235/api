import { Request, Response } from 'express';
import User from '../schemas/User';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';


type UserData = {
  name: string,
  email: string,
  password: string
}

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
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8)
    });

    const validate = await schema.isValid(req.body);

    if (! validate) {
      return res.status(400).json({
        mensagem: 'Invalid input schema'
      });
    }

    const user: UserData = await User.findOne({ email: email });

    if (! user) {
      return res.status(400).json({
        mensagem: 'User not found'
      });
    }

    const checkIfPasswordMatches = await bcrypt.compare(password, user.password);

    if (!checkIfPasswordMatches) {
      return res.status(400).json({
        mensagem: 'Validation failed!'
      });
    }

    return res.status(201).json(
      {
        name: user.name,
        email: user.email
      });
  }
}

export { LoginController };
