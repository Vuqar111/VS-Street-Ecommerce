import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true},
    amount_percent: { type: Number, required: true},
  },
  {
    timestamps: true,
  }
);
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;

