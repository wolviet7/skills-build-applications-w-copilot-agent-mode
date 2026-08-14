import { Router } from 'express';

import { LeaderboardModel } from '../models/leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const entries = await LeaderboardModel.find().sort({ rank: 1 }).lean();

    response.json({
      resource: 'leaderboard',
      count: entries.length,
      entries,
    });
  } catch (error) {
    next(error);
  }
});

export { leaderboardRouter };