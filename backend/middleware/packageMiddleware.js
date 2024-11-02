// middleware/packageMiddleware.js
import Item from '../models/Item.js';

export const validateItemsExist = async (req, res, next) => {
  const { items } = req.body;
  const foundItems = await Item.find({ _id: { $in: items } });
  if (foundItems.length !== items.length) {
    return res.status(400).json({ error: 'One or more items not found' });
  }
  next();
};
