import { Request } from 'express';

export type GetShopsRequest = Request<
  unknown,
  unknown,
  unknown,
  {
    page: string;
    limit: string;
  }
>;

export type GetShopRequest = Request<
  {
    id: string;
  },
  unknown,
  unknown,
  unknown
>;

export type SearchShopsRequest = Request<
  unknown,
  unknown,
  unknown,
  {
    latitude: string;
    longitude: string;
    radius: string;
  }
>;

export type PostShopRequest = Request<
  unknown,
  unknown,
  {
    name: string;
    description?: string;
    position: {
      latitude: number;
      longitude: number;
    };
  },
  unknown
>;
