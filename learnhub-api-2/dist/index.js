import express from 'express';
import user from './handlers/userRout.js';
const app = express();
app.use(express.json());
app.use('/user', user);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
