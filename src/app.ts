import path from 'path';
import express, { Application } from 'express';
import compression from 'compression'; // compresses requests
import cors from 'cors';
import { initRoutes } from './routes';

// Create Express server
const app: Application = express();

// Express configuration
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views'), { maxAge: 31557600000 }));

// Define Routes
initRoutes(app);

export { app };
