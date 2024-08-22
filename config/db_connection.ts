import { connect } from 'mongoose';

// DB connection function
export async function connectDB() {
  try {
    await connect(process.env.DB_URL ?? '');
    console.log('MongoDB connected.');
  } catch (err) {
    console.log('Error connecting to the database.', err);
  }
}
