import { ConferenceDatabase } from '../database/ConferenceDatabase';
import express from 'express';

export const router = express.Router();

router.post('/get-by-title', async (request, response) => {
    const titlePattern = request.body.pattern;
    if (titlePattern == undefined) {
        response.status(400).send();
        return;
    }
    try {
        const results = await ConferenceDatabase.getInstance().findByTitlePattern(titlePattern);
        response.send(results);
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
        return;
    }
});

router.post('/get-by-date', async (request, response) => {
    if (request.body.dateStart == undefined) {
        response.status(400).send();
        return;
    }
    try {
        if (request.body.dateFinish != undefined) {
            const result = await ConferenceDatabase.getInstance().findByDateRange(new Date(request.body.dateStart), new Date(request.body.dateFinish));
            response.send(result);
        }
        else {
            const result = await ConferenceDatabase.getInstance().findByStartDate(new Date(request.body.dateStart));
            response.send(result);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

router.post('/get-by-projects', async (request, response) => {
    if (request.body.projects == undefined) {
        response.status(400).send();
        return;
    }
    try {
        const result = await ConferenceDatabase.getInstance().findByProjects(request.body.projects);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

router.post('/get-by-tags', async (request, response) => {
    if (request.body.tags == undefined) {
        response.status(400).send();
        return;
    }
    try {
        const result = await ConferenceDatabase.getInstance().findByTags(request.body.tags);
        response.send(result);
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

router.post('/add', async (request, response) => {
    const data = request.body;
    try {
        const result = await ConferenceDatabase.getInstance().addConference(data);
        console.log(result);
        response.send('OK');
    }
    catch (error) {
        console.log(error);
        response.status(400).send(error);
    }
});
