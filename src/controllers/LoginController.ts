import { Request, Response } from 'express';
import { jwtConfig } from '../config/jwt';
import User from '../schemas/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

class LoginController {

  /**
   * Function used to log-in the user into the application.
   * @param req the incoming request
   * @param res the reponse
   */
  async create(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

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

    let user = await User.findOne({ email: email });

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

    const token = await jwt.sign(
      { data: user.email },
      jwtConfig.secretKey,
      { expiresIn: jwtConfig.expiresIn }
    );

    return res.status(201).json({
      type: 'Bearer',
      tolen: token
    });
  }
}

export { LoginController };
