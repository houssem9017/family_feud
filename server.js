import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler,notFoundError } from './Middlewares/error-handler.js';
import userRoutes from './Routes/user.js';
import partyRoutes from './Routes/party.js';
import { delete_afk_parties } from './Controllers/party.js';

const app = express();

const port = process.env.Port || 3030;//9001
const database = 'SIM3'
mongoose.connect(`mongodb://localhost:27017/${database}`)
.then(() => console.log("Connected"))
.catch((error) => console.log(error));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extend: true}));

app.use((req, res, next)=>
{
    delete_afk_parties(req, res);
    next();
});

app.use('/user', userRoutes);
app.use('/party', partyRoutes);
app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
