import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            ActivityModel.deleteMany({}),
            LeaderboardModel.deleteMany({}),
            TeamModel.deleteMany({}),
            UserModel.deleteMany({}),
            WorkoutModel.deleteMany({}),
        ]);
        const teams = await TeamModel.insertMany([
            {
                name: 'Summit Sprinters',
                city: 'Seattle',
                description: 'A pace-focused team preparing for city 10K races and lunchtime interval sessions.',
                totalPoints: 1840,
            },
            {
                name: 'Iron Harbor Crew',
                city: 'Boston',
                description: 'Strength-first athletes balancing lifting blocks with weekend rowing cross-training.',
                totalPoints: 1765,
            },
            {
                name: 'Desert Pulse',
                city: 'Phoenix',
                description: 'Hybrid competitors mixing mobility work, cycling miles, and early-morning conditioning.',
                totalPoints: 1690,
            },
        ]);
        const users = await UserModel.insertMany([
            {
                fullName: 'Maya Chen',
                email: 'maya.chen@octofit.test',
                age: 29,
                city: 'Seattle',
                fitnessLevel: 'advanced',
                weeklyGoal: 'Complete four speed sessions and one long run.',
                team: teams[0]._id,
            },
            {
                fullName: 'Jordan Alvarez',
                email: 'jordan.alvarez@octofit.test',
                age: 34,
                city: 'Seattle',
                fitnessLevel: 'intermediate',
                weeklyGoal: 'Increase weekly mileage to 32 kilometers.',
                team: teams[0]._id,
            },
            {
                fullName: 'Nia Thompson',
                email: 'nia.thompson@octofit.test',
                age: 31,
                city: 'Boston',
                fitnessLevel: 'advanced',
                weeklyGoal: 'Add two extra posterior-chain sessions this month.',
                team: teams[1]._id,
            },
            {
                fullName: 'Evan Brooks',
                email: 'evan.brooks@octofit.test',
                age: 27,
                city: 'Boston',
                fitnessLevel: 'intermediate',
                weeklyGoal: 'Hold a 2-minute plank after every strength workout.',
                team: teams[1]._id,
            },
            {
                fullName: 'Sofia Patel',
                email: 'sofia.patel@octofit.test',
                age: 26,
                city: 'Phoenix',
                fitnessLevel: 'advanced',
                weeklyGoal: 'Finish three sunrise rides before work each week.',
                team: teams[2]._id,
            },
            {
                fullName: 'Liam Carter',
                email: 'liam.carter@octofit.test',
                age: 30,
                city: 'Phoenix',
                fitnessLevel: 'beginner',
                weeklyGoal: 'Stay consistent with three guided workouts a week.',
                team: teams[2]._id,
            },
        ]);
        teams[0].captain = users[0]._id;
        teams[0].members = [users[0]._id, users[1]._id];
        teams[1].captain = users[2]._id;
        teams[1].members = [users[2]._id, users[3]._id];
        teams[2].captain = users[4]._id;
        teams[2].members = [users[4]._id, users[5]._id];
        await Promise.all(teams.map((team) => team.save()));
        await ActivityModel.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: 'Tempo Run',
                durationMinutes: 52,
                caloriesBurned: 640,
                distanceKm: 9.8,
                performedAt: new Date('2026-08-12T06:30:00.000Z'),
                notes: 'Strong negative split on the final 3 kilometers.',
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                type: 'Hill Repeats',
                durationMinutes: 45,
                caloriesBurned: 510,
                distanceKm: 6.2,
                performedAt: new Date('2026-08-11T18:10:00.000Z'),
                notes: 'Six steep repeats with short walk-back recovery.',
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                type: 'Lower Body Strength',
                durationMinutes: 60,
                caloriesBurned: 420,
                distanceKm: 0,
                performedAt: new Date('2026-08-12T12:15:00.000Z'),
                notes: 'Heavy trap-bar deadlifts paired with sled pushes.',
            },
            {
                user: users[3]._id,
                team: teams[1]._id,
                type: 'Row Erg Intervals',
                durationMinutes: 38,
                caloriesBurned: 390,
                distanceKm: 7.4,
                performedAt: new Date('2026-08-10T17:45:00.000Z'),
                notes: 'Eight 500m repeats holding consistent split times.',
            },
            {
                user: users[4]._id,
                team: teams[2]._id,
                type: 'Endurance Ride',
                durationMinutes: 80,
                caloriesBurned: 760,
                distanceKm: 28.6,
                performedAt: new Date('2026-08-09T05:50:00.000Z'),
                notes: 'Steady cadence ride before the desert heat set in.',
            },
            {
                user: users[5]._id,
                team: teams[2]._id,
                type: 'Mobility Flow',
                durationMinutes: 30,
                caloriesBurned: 140,
                distanceKm: 0,
                performedAt: new Date('2026-08-08T19:20:00.000Z'),
                notes: 'Recovery-focused hip and thoracic mobility session.',
            },
        ]);
        await LeaderboardModel.insertMany([
            {
                rank: 1,
                competitorType: 'team',
                competitorName: 'Summit Sprinters',
                points: 1840,
                wins: 9,
                periodLabel: 'August 2026',
            },
            {
                rank: 2,
                competitorType: 'team',
                competitorName: 'Iron Harbor Crew',
                points: 1765,
                wins: 7,
                periodLabel: 'August 2026',
            },
            {
                rank: 3,
                competitorType: 'team',
                competitorName: 'Desert Pulse',
                points: 1690,
                wins: 6,
                periodLabel: 'August 2026',
            },
            {
                rank: 4,
                competitorType: 'user',
                competitorName: 'Maya Chen',
                points: 980,
                wins: 4,
                periodLabel: 'August 2026',
            },
            {
                rank: 5,
                competitorType: 'user',
                competitorName: 'Sofia Patel',
                points: 930,
                wins: 4,
                periodLabel: 'August 2026',
            },
        ]);
        await WorkoutModel.insertMany([
            {
                title: 'Harbor Strength Circuit',
                category: 'strength',
                difficulty: 'intermediate',
                durationMinutes: 42,
                targetMuscles: ['glutes', 'hamstrings', 'core'],
                equipment: ['dumbbells', 'resistance band', 'bench'],
                description: 'Three-round circuit built around split squats, rows, and loaded carries.',
            },
            {
                title: 'Sunrise Spin Builder',
                category: 'cardio',
                difficulty: 'advanced',
                durationMinutes: 55,
                targetMuscles: ['quads', 'calves', 'core'],
                equipment: ['indoor bike'],
                description: 'Progressive threshold ride with three sustained efforts and easy spin recoveries.',
            },
            {
                title: 'Desk Reset Mobility',
                category: 'mobility',
                difficulty: 'beginner',
                durationMinutes: 20,
                targetMuscles: ['hips', 'thoracic spine', 'shoulders'],
                equipment: ['yoga mat'],
                description: 'A short mobility sequence for hip flexors, T-spine rotation, and shoulder opening.',
            },
            {
                title: '10K Tempo Builder',
                category: 'running',
                difficulty: 'advanced',
                durationMinutes: 48,
                targetMuscles: ['hamstrings', 'glutes', 'calves'],
                equipment: ['running shoes', 'watch'],
                description: 'Warm up, tempo block, and strides designed to raise lactate threshold for race prep.',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
