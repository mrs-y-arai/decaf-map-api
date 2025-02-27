import { Router } from 'express';
import { PlaceController } from '~/controllers/PlaceController.js';

export const PlaceRouter = Router();

const placeController = new PlaceController();

PlaceRouter.get('/', placeController.getPlaces);
PlaceRouter.get('/search', placeController.searchNearByPoint);
PlaceRouter.get('/:id', placeController.getPlace);
PlaceRouter.post('/', placeController.createPlace);
