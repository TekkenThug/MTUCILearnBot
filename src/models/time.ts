import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Time = new Schema({
  number: Number,
  time: String
});

export default mongoose.model('Time', Time);
