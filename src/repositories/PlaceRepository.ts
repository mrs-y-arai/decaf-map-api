import prisma from '~/infrastructure/database/prisma.js';
import { placeListSchema } from '~/schema/Place.js';
import { type Place } from '~/models/Place.js';
import { placeConverter } from '~/converters/database/placeConverter.js';
import { type PrismaClient } from '@prisma/client';

export class PlaceRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public findById = async (id: string): Promise<Place> => {
    const place = await this.prisma.$queryRaw`
    SELECT id, name, description,ST_AsGeoJSON(location)::json as location, created_at
    FROM "places"
    WHERE id = ${id}::uuid`;

    const parsedPlaces = placeListSchema.safeParse(place);
    if (!parsedPlaces.success) {
      throw new Error('Failed to parse place');
    }

    return placeConverter(parsedPlaces.data[0]);
  };

  public findMany = async (params: {
    page: number;
    limit: number;
  }): Promise<Place[]> => {
    const places = await this.prisma.$queryRaw`
    SELECT id, name, description,ST_AsGeoJSON(location)::json as location, created_at
    FROM "places"
    LIMIT ${params.limit}
    OFFSET ${(params.page - 1) * params.limit}`;

    const parsedPlaces = placeListSchema.safeParse(places);
    if (!parsedPlaces.success) {
      throw new Error('Failed to parse places');
    }

    return parsedPlaces.data.map((item) => placeConverter(item));
  };

  public create = async (params: {
    name: string;
    description?: string;
    position: {
      latitude: number;
      longitude: number;
    };
  }) => {
    await this.prisma.$queryRaw`
      INSERT INTO "places"
      (name, description, location)
      VALUES (${params.name},${params.description ?? null},
      ST_Point(${params.position.longitude}, ${params.position.latitude}))`;

    return {
      isSuccess: true,
    };
  };

  public searchNearByPoint = async (params: {
    position: {
      latitude: number;
      longitude: number;
    };
    distance: number;
  }) => {
    const places = await this.prisma.$queryRaw`
    SELECT id, name, description,ST_AsGeoJSON(location)::json as location, created_at
    FROM "places"
    WHERE ST_DWithin(
      location::geography,
      ST_Point(${params.position.longitude}, ${params.position.latitude})::geography,
      ${params.distance})`;

    const parsedPlaces = placeListSchema.safeParse(places);
    if (!parsedPlaces.success) {
      throw new Error('Failed to parse places');
    }

    return parsedPlaces.data.map((item) => placeConverter(item));
  };
}
