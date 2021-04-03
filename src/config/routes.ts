import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();
const user = new UserController();

routes.post('/users/create', user.create);

export default routes;
