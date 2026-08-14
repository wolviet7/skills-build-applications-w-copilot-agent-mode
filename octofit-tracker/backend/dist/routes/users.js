import { Router } from 'express';
import { UserModel } from '../models/user.js';
const usersRouter = Router();
usersRouter.get('/', async (_request, response, next) => {
    try {
        const users = await UserModel.find()
            .populate('team', 'name city totalPoints')
            .sort({ fullName: 1 })
            .lean();
        response.json({
            resource: 'users',
            count: users.length,
            items: users,
        });
    }
    catch (error) {
        next(error);
    }
});
export { usersRouter };
