import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';

dotenv.config();
const PORT = process.env.PORT || 50001;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, (error) => {
    if(error) return console.log('error in starting server', error);
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB();
});