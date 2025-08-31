import createApp from './server';
import { ContentType } from './utils/content-type';


const app = createApp();
const port = process.env.PORT;

const defHeaders = {
    contentType: ContentType.JSON,
    charset: 'utf-8'
};

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});