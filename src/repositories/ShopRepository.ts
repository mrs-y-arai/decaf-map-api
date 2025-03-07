import prisma from '~/infrastructure/database/prisma.js';
import { shopListSchema } from '~/schema/Shop.js';
import { type Shop } from '~/models/Shop.js';
import { shopConverter } from '~/converters/database/shopConverter.js';
import { type PrismaClient } from '@prisma/client';

export class ShopRepository {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public findById = async (id: string): Promise<Shop> => {
    const shop = await this.prisma.$queryRaw`
    SELECT id, name, description,ST_AsGeoJSON(location)::json as location, created_at
    FROM "shops"
    WHERE id = ${id}::uuid`;

    const parsedShops = shopListSchema.safeParse(shop);
    if (!parsedShops.success) {
      throw new Error('Failed to parse shop');
    }

    return shopConverter(parsedShops.data[0]);
  };

  public findMany = async (params: {
    page: number;
    limit: number;
  }): Promise<Shop[]> => {
    const shops = await this.prisma.$queryRaw`
    SELECT id, name, description,ST_AsGeoJSON(location)::json as location, created_at
    FROM "shops"
    LIMIT ${params.limit}
    OFFSET ${(params.page - 1) * params.limit}`;

    const parsedShops = shopListSchema.safeParse(shops);
    if (!parsedShops.success) {
      throw new Error('Failed to parse shops');
    }

    return parsedShops.data.map((item) => shopConverter(item));
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
      INSERT INTO "shops"
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
    const shops = await this.prisma.$queryRaw`
    SELECT id, name, description,ST_AsGeoJSON(location)::json as location, created_at
    FROM "shops"
    WHERE ST_DWithin(
      location::geography,
      ST_Point(${params.position.longitude}, ${params.position.latitude})::geography,
      ${params.distance})`;

    const parsedShops = shopListSchema.safeParse(shops);
    if (!parsedShops.success) {
      throw new Error('Failed to parse shops');
    }

    return parsedShops.data.map((item) => shopConverter(item));
  };
}
