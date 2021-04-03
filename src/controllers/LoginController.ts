import { Request, Response } from 'express';
import User from '../schemas/User';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';


type UserData = {
  name: string,
  email: string,
  password: string
}

type ErrorInformation = {
  mensagem: String
}

class LoginController {

  /**
   * Function used to log-in the user into the application.
   * @param req the incoming request
   * @param res the reponse
   */
  async create(req: Request, res: Response): Promise<any> {
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

    let user: UserData;
    user = await User.findOne({ email: email });

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
