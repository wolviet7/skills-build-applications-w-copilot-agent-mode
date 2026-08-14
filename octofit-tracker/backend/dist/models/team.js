import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    totalPoints: {
        type: Number,
        required: true,
        min: 0,
    },
    captain: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    timestamps: true,
});
const TeamModel = model('Team', teamSchema);
export { TeamModel };
