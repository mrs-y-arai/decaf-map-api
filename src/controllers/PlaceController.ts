import { PlaceRepository } from '~/repositories/PlaceRepository.js';
import { Response } from 'express';
import {
  GetPlacesRequest,
  GetPlaceRequest,
  PostPlaceRequest,
  SearchPlacesRequest,
} from '~/types/Request/Place.js';

export class PlaceController {
  private placeRepository: PlaceRepository;

  constructor() {
    this.placeRepository = new PlaceRepository();
  }

  public getPlaces = async (req: GetPlacesRequest, res: Response) => {
    try {
      const places = await this.placeRepository.findMany({
        page: Number(req.query.page),
        limit: Number(req.query.limit),
      });
      res.status(200).json({
        body: {
          places,
        },
        message: 'success',
      });
    } catch (err) {
      res.status(400).json({ message: `カフェ一覧取得失敗 ${err}` });
    }
  };

  public getPlace = async (req: GetPlaceRequest, res: Response) => {
    try {
      const places = await this.placeRepository.findById(req.params.id);
      res.status(200).json({
        body: {
          places,
        },
        message: 'success',
      });
    } catch (err) {
      res.status(400).json({ message: `カフェ取得失敗 ${err}` });
    }
  };

  public createPlace = async (req: PostPlaceRequest, res: Response) => {
    try {
      await this.placeRepository.create({
        name: req.body.name,
        description: req.body.description,
        position: {
          latitude: Number(req.body.position.latitude),
          longitude: Number(req.body.position.longitude),
        },
      });
      res.status(200).json({
        message: 'success',
      });
    } catch (err) {
      res.status(400).json({ message: `カフェ作成失敗 ${err}` });
    }
  };

  public searchNearByPoint = async (
    req: SearchPlacesRequest,
    res: Response,
  ) => {
    try {
      const places = await this.placeRepository.searchNearByPoint({
        position: {
          latitude: Number(req.query.latitude),
          longitude: Number(req.query.longitude),
        },
        distance: Number(req.query.radius),
      });
      res.status(200).json({
        body: {
          places,
        },
        message: 'success',
      });
    } catch (err) {
      res.status(400).json({ message: `カフェ取得失敗 ${err}` });
    }
  };
}
