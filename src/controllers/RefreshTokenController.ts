import { Request, Response } from 'express';
import { jwtConfig } from '../config/jwt';
import User from '../schemas/User';
import jwt from 'jsonwebtoken';

class RefreshTokenController {

  /**
   * Function used to refresh a token which was expired but valid.
   * @param req the incoming request
   * @param res the reponse
   */
  async create(req: Request, res: Response): Promise<any> {}
}

export { RefreshTokenController };
