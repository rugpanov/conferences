import mongoose, { Schema, Document } from 'mongoose';

const ConferenceSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    projects: {
        type: [String]
    },
    location: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateFinish: {
        type: String
    },
    tags: {
        type: [String]
    },
    participants: {
        type: [Object]
    },
    ytLink: {
        type: String
    },
    attendance: {
        type: Number
    },
    link: {
        type: String
    },
    comments: {
        type: [String]
    },
    status: {
        type: String,
        required: true
    }
});

export interface ConferenceLocation {
    city: string;
    country: string;
}

export interface ConferenceParticipant {
    name: string;
    type: string;
    status: string;
    invited: boolean;
}

export interface Conference extends Document {
    title: string;
    projects: string[];
    clocation: ConferenceLocation;
    dateStart: Date;
    dateFinish: Date;
    tags: string[];
    participants: ConferenceParticipant[];
    ytLink: string;
    attendance: number;
    link: string;
    comments: string[];
    status: string;
}

export const ConferenceModel = mongoose.model<Conference>('Conference', ConferenceSchema);
