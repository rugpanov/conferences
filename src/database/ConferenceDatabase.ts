import { ConferenceModel, Conference } from './models/Conference';
import mongoose from 'mongoose';

export class ConferenceDatabase {
    private static INSTANCE = new ConferenceDatabase();

    static getInstance(): ConferenceDatabase {
        return this.INSTANCE;
    }

    async connect(): Promise<void> {
        const url = process.env.DATABASE_CONNECTION_URL || 'mongodb://localhost:27017/conferences';
        try {
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to database!');
        }
        catch (error) {
            console.log('Could not connect to database!');
            console.log(error);
            process.exit(1);
        }
    }

    async findByTitlePattern(pattern: string): Promise<Conference[]> {
        const regex = new RegExp(pattern, 'i');
        const query = await ConferenceModel.find({
            title: regex
        }).exec();
        return query;
    }

    async findByStartDate(date: Date): Promise<Conference[]> {
        const query = await ConferenceModel.find({
            dateStart: date
        }).exec();
        return query;
    }

    async findByDateRange(start: Date, end: Date): Promise<Conference[]> {
        const query = await ConferenceModel.find({
            dateStart: {
                $gte: start
            },
            dateFinish: {
                $lte: end
            }
        }).exec();
        return query;
    }

    async findByProjects(projects: string[]): Promise<Conference[]> {
        const query = await ConferenceModel.find({
            projects: {
                $all: projects
            }
        }).exec();
        return query;
    }

    async findByTags(tags: string[]): Promise<Conference[]> {
        const query = await ConferenceModel.find({
            projects: {
                $all: tags
            }
        }).exec();
        return query;
    }

    addConference(conference: Conference): Promise<Conference> {
        return ConferenceModel.create(conference);
    }
}
