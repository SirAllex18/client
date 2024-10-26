import mongoose from 'mongoose';
import Party from "./models/Party.js";

const mongoURI = 'mongodb+srv://SirAllex:NewDawn25@cluster2.rdrys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2';

const runScript = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    await createPlayer();

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

const createPlayer = async () => {
  const party = new Party({
    role: 'Vibes'
  });

  try {
    const savedSnack = await party.save();
    console.log('Snack saved', savedSnack);
  } catch (err) {
    console.error('Error:', err.message);
  }
};

runScript();
