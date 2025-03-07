import { ShopRepository } from '~/repositories/ShopRepository.js';
import { Response } from 'express';
import {
  GetShopsRequest,
  GetShopRequest,
  PostShopRequest,
  SearchShopsRequest,
} from '~/types/Request/Shop.js';

// TODO: Numberのキャストを真面目にzod parseする

export class ShopController {
  private shopRepository: ShopRepository;

  constructor() {
    this.shopRepository = new ShopRepository();
  }

  public getShops = async (req: GetShopsRequest, res: Response) => {
    try {
      const shops = await this.shopRepository.findMany({
        page: Number(req.query.page),
        limit: Number(req.query.limit),
      });
      res.status(200).json({
        body: {
          shops,
        },
        message: 'success',
      });
    } catch (err) {
      res.status(400).json({ message: `店舗一覧取得失敗 ${err}` });
    }
  };

  public getShop = async (req: GetShopRequest, res: Response) => {
    try {
      const shops = await this.shopRepository.findById(req.params.id);
      res.status(200).json({
        body: {
          shops,
        },
        message: 'success',
      });
    } catch (err) {
      res.status(400).json({ message: `カフェ取得失敗 ${err}` });
    }
  };

  public createShop = async (req: PostShopRequest, res: Response) => {
    try {
      await this.shopRepository.create({
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

  public searchNearByPoint = async (req: SearchShopsRequest, res: Response) => {
    try {
      const shops = await this.shopRepository.searchNearByPoint({
        position: {
          latitude: Number(req.query.latitude),
          longitude: Number(req.query.longitude),
        },
        distance: Number(req.query.radius),
      });
      res.status(200).json({
        body: {
          shops,
        },
        message: 'success',
      });
    } catch (err) {
      res.status(400).json({ message: `カフェ取得失敗 ${err}` });
    }
  };
}
