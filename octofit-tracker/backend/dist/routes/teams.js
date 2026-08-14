import { Router } from 'express';
import { TeamModel } from '../models/team.js';
const teamsRouter = Router();
teamsRouter.get('/', async (_request, response, next) => {
    try {
        const teams = await TeamModel.find()
            .populate('captain', 'fullName email fitnessLevel')
            .populate('members', 'fullName email fitnessLevel weeklyGoal')
            .sort({ totalPoints: -1, name: 1 })
            .lean();
        response.json({
            resource: 'teams',
            count: teams.length,
            items: teams,
        });
    }
    catch (error) {
        next(error);
    }
});
export { teamsRouter };
