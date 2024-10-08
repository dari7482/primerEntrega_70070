import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://Dario:XQr2vgqNA7zcJgQJ@cluster0.pmc2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
