import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    durationMinutes: {
        type: Number,
        required: true,
        min: 1,
    },
    caloriesBurned: {
        type: Number,
        required: true,
        min: 0,
    },
    distanceKm: {
        type: Number,
        required: true,
        min: 0,
    },
    performedAt: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
const ActivityModel = model('Activity', activitySchema);
export { ActivityModel };
