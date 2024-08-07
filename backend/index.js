import express from 'express';
import dotenv from "dotenv";
import { app } from './app.js';
import cors from "cors"
// Load environment variables from .env file
dotenv.config({
  path: '.env'
});
app.use(cors())
// Ensure PORT is loaded from environment variables
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port ' + port);
});
