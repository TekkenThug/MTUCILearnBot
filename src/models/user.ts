import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  userID: Number,
  group: String
});

export default mongoose.model('User', User);
