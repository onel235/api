import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { LoginController } from '../controllers/LoginController';

const routes = Router();
const user = new UserController();
const login = new LoginController();

routes.post('/users/create', user.create);
routes.post('/login', login.create);

export default routes;
