import express from 'express';
import user from './handlers/userRout.js';
import contents from './handlers/contentRout.js';
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
app.use(express.json());
app.use('/user', user);
app.use('/auth', user);
app.use('/contents', contents);
app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
