import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Group = new Schema({
  id: Schema.Types.ObjectId,
  name: String
});

export default mongoose.model('Group', Group);
