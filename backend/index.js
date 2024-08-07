import express from 'express';
import dotenv from "dotenv";
import { app } from './app.js';

// Load environment variables from .env file
dotenv.config({
  path: '.env'
});

// Ensure PORT is loaded from environment variables
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port ' + port);
});
