import { Router } from 'express';
import { ActivityModel } from '../models/activity.js';
const activitiesRouter = Router();
activitiesRouter.get('/', async (_request, response, next) => {
    try {
        const activities = await ActivityModel.find()
            .populate('user', 'fullName email')
            .populate('team', 'name city')
            .sort({ performedAt: -1 })
            .lean();
        response.json({
            resource: 'activities',
            count: activities.length,
            items: activities,
        });
    }
    catch (error) {
        next(error);
    }
});
export { activitiesRouter };
