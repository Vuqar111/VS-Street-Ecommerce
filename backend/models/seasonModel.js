
import mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Season = mongoose.model('Season', seasonSchema);
export default Season;
