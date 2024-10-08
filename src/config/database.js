import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
