import express, { Request, Response, NextFunction } from 'express';
import { Routes } from './routes/routes';
import { StatusCode } from './utils/status-code';
import { ContentType } from './utils/content-type';
import cors from 'cors';

function createApp() {
  const app = express();

  // === MIDDLEWARES BÁSICOS ===
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

  // === HEADERS GLOBAIS ===
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', ContentType.JSON);
    res.setHeader('Charset', 'utf-8');

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
  });

  // === ROTA RAIZ ===
  app.get(Routes.Root, (req: Request, res: Response) => {
    res.status(StatusCode.OK).json({ message: 'Hello world' });
  });

  return app;
}

export default createApp;