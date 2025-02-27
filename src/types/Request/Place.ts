import { Request } from 'express';

export type GetPlacesRequest = Request<
  unknown,
  unknown,
  unknown,
  {
    page: string;
    limit: string;
  }
>;

export type GetPlaceRequest = Request<
  {
    id: string;
  },
  unknown,
  unknown,
  unknown
>;

export type SearchPlacesRequest = Request<
  unknown,
  unknown,
  unknown,
  {
    latitude: string;
    longitude: string;
    radius: string;
  }
>;

export type PostPlaceRequest = Request<
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
