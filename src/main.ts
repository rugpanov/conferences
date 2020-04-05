import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { populateDatabase } from './database/populateDatabase';
import { ConferenceDatabase } from './database/ConferenceDatabase';
import { router as conferencesRouter } from './routes/conferences';

dotenv.config();

const port = process.env.PORT || 9000;

const app = express();
const router = express.Router();

app.use(express.json());
app.use(morgan('combined'));
app.use(router);

router.use('/api/conferences', conferencesRouter);


async function main(): Promise<void> {
    await ConferenceDatabase.getInstance().connect();
    if (process.env.POPULATE_DATABASE) {
        await populateDatabase(ConferenceDatabase.getInstance());
    }
    app.listen(port, () => {
        console.log(`Server started on: ${port}`);
    });
}

try {
    main();
}
catch (error) {
    console.log(error);
}
