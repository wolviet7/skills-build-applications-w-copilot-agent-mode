import { Router } from 'express';
import { WorkoutModel } from '../models/workout.js';
const workoutsRouter = Router();
workoutsRouter.get('/', async (_request, response, next) => {
    try {
        const workouts = await WorkoutModel.find().sort({ difficulty: 1, title: 1 }).lean();
        response.json({
            resource: 'workouts',
            count: workouts.length,
            items: workouts,
        });
    }
    catch (error) {
        next(error);
    }
});
export { workoutsRouter };
