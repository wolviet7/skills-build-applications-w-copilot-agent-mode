import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
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
}, {
    timestamps: true,
});
const LeaderboardModel = model('Leaderboard', leaderboardSchema);
export { LeaderboardModel };
