import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { connectDB } from './config';
import { authRouter, tripsRouter, usersRouter } from './routes';

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
connectDB();

// auth routes
app.use('/auth', authRouter);

// trips routes
app.use('/trips', tripsRouter);

// trips routes
app.use('/users', usersRouter);

// home route
app.get('/', (req, res) => res.send('Trip Planner API'));

const server = app.listen(process.env.PORT, () => console.log(`Server Connected to port ${process.env.PORT}`));

process.on('unhandledRejection', (err) => {
  console.log(`An error occurred: ${err}`);
  server.close(() => process.exit(1));
});
