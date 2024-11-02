// routes/itemsRoutes.js
import express from 'express';
import {

  getAllItems,

} from '../controllers/itemController.js'; // Import item controllers


const router = express.Router();



router.get('/', getAllItems); // Get all items


export default router;
