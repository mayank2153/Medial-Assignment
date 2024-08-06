import express from 'express';
import dotenv from "dotenv";
import serverless from 'serverless-http';
import { app } from './app.js';

dotenv.config({
  path: '.env'
});

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});

export const handler = serverless(app);
