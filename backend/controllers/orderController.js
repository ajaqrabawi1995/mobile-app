// controllers/orderController.js
import Order from '../models/Order.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      street,
      buildingNumber,
      city,
      deliveryTime,
      totalAmount,
      paymentMethod,
      location,
    } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !street || !buildingNumber || !city || !deliveryTime || !totalAmount || !paymentMethod || !location) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const newOrder = new Order({
      name,
      phoneNumber,
      street,
      buildingNumber,
      city,
      deliveryTime,
      totalAmount,
      paymentMethod,
      location,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Failed to retrieve orders' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ message: 'Failed to retrieve order' });
  }
};
