import express from 'express';
import user from './handlers/userRout.js';
import contents from './handlers/contentRout.js';
import { verifyToken } from './middleware/middleware.jwt.js';
import cors from 'cors';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:3001',
    }),
);

const port = process.env.PORT;
app.use(express.json());
app.use('', user);
app.use('/protected', verifyToken, contents);
app.use('/content   ', contents);

app.listen(port, () => {
    console.log(`Server is running on ${process.env.DOMAIN_URL}`);
});
