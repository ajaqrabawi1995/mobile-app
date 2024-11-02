// models/Package.js
import mongoose from 'mongoose';
import items from './Item.js'
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item', // Ensure this references an existing Item model
      required: true
    }
  ],
  totalPrice: {
    type: Number,
    default: 0
  }
});

// Pre-save hook to calculate totalPrice
packageSchema.pre('save', async function (next) {
  const items = await mongoose.model('Item').find({ _id: { $in: this.items } });
  this.totalPrice = items.reduce((total, item) => total + item.price, 0);
  next();
});

const Package = mongoose.model('Package', packageSchema);
export default Package;
