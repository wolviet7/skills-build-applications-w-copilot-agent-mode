import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        required: true,
        min: 13,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    weeklyGoal: {
        type: String,
        required: true,
        trim: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        default: null,
    },
}, {
    timestamps: true,
});
const UserModel = model('User', userSchema);
export { UserModel };
