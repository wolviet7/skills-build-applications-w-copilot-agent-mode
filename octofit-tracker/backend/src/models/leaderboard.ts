import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    competitorType: {
      type: String,
      enum: ['user', 'team'],
      required: true,
    },
    competitorName: {
      type: String,
      required: true,
      trim: true,
    },
    points: {
      type: Number,
      required: true,
      min: 0,
    },
    wins: {
      type: Number,
      required: true,
      min: 0,
    },
    periodLabel: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model<Leaderboard>('Leaderboard', leaderboardSchema);

export { LeaderboardModel };
export type { Leaderboard };