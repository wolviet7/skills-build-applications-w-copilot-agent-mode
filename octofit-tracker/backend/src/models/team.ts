import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

type Team = InferSchemaType<typeof teamSchema>;

const TeamModel = model<Team>('Team', teamSchema);

export { TeamModel };
export type { Team };