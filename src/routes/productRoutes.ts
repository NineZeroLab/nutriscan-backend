import express from 'express'
import getProductDetails from '../controllers/productController'
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/product/:productId', verifyToken, getProductDetails);

export default router
