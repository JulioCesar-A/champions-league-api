import clubRouter from './routes/club-routes';
import playerRouter from './routes/player-routes';
import createApp from './app';

const app = createApp();
const port = process.env.PORT;

app.use('/players', playerRouter);
app.use('/clubs', clubRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
}); 