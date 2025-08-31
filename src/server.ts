import express, { Request, Response } from 'express';
import { Routes } from './routes/routes';
import { StatusCode } from './utils/status-code';

function createApp(){
    const app = express();
    
    app.use(express.json());
    app.get(Routes.Root, (req: Request, res: Response) => {
        res.status(StatusCode.OK).json({ "message" : "Hello world" });
    });

    return app;
}

export default createApp;