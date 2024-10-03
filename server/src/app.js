import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MainRoute from './routes/main'

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1/', MainRoute)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://pythoncux:pythoncux@cluster0.tl7krxg.mongodb.net/pastebin')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
