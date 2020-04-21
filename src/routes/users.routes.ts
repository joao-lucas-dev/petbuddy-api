import { Router } from 'express';

import CreateUsersService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUsers = new CreateUsersService();

    const user = await createUsers.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default usersRouter;
