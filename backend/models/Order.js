// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  buildingNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card'],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.index({ location: '2dsphere' });

export default mongoose.model('Order', orderSchema);
