import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './database/sequelize';
import { Routes } from './routers';
import App from './app/App';
import * as http from 'http';


const app = express();
const port = process.env.PORT || 3000;
const router = new Routes();
const httpServer: http.Server = http.createServer(App);

App.get('/', (req: Request, res: Response) => {
    res.send('Server is Running ...');
});


sequelize.sync({ force: false, alter: false });

httpServer.listen(port, () => {
    console.log(`Running API on port : ${port}`);
});
