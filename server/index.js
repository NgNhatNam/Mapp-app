import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    next();
});

app.use(express.json({ limit: '10mb' }));
app.use('/room', roomRouter);
app.use('/user', userRouter);
app.use('/', (req, res) => res.json({ message: 'Welcome to our API' }));

app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
})();

app.listen(port, () => console.log(`Server is listening on ${port}`));
