import { Router } from 'express';
import { ShopController } from '~/controllers/ShopController.js';
import { authMiddleware } from '~/middleware/authMiddleware.js';

export const ShopRouter = Router();

const shopController = new ShopController();

ShopRouter.get('/', shopController.getShops);
ShopRouter.get('/search', shopController.searchNearByPoint);
ShopRouter.get('/:id', shopController.getShop);
ShopRouter.post('/', authMiddleware, shopController.createShop);
