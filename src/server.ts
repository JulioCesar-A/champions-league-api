import clubRouter from './routes/club-routes';
import playerRouter from './routes/player-routes';
import createApp from './app';
import { Request, Response } from 'express';
import { StatusCode } from './utils/status-code';

const app = createApp();
const port = process.env.PORT;

app.use('/players', playerRouter);
app.use('/clubs', clubRouter);

  // === TRATAMENTO DE ROTAS NÃO ENCONTRADAS ===
app.use((req: Request, res: Response) => {
    res.status(StatusCode.NotFound).json({
        error: 'Route not found',
        method: req.method,
        path: req.path
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}); 