import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

// connect Mongoose to your DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/redditdb', () => {
    console.log("connected to mongodb...");
});

const app = express();

// Middleware
app.use(cors());

app.use(bodyParser.json());

app.use('/api', routes);

export default app;