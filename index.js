import express from 'express';
const app = express();

app.use(express.json())

import cors from 'cors';
app.use(cors());

app.listen(8181);

import rootRoute from './src/routes/rootRoutes.js';

app.use("/api", rootRoute)
