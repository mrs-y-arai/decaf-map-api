import { type ShopSchema } from '~/schema/Shop.js';
import { type Shop } from '~/models/Shop.js';

export function shopConverter(params: ShopSchema): Shop {
  return {
    id: params.id,
    name: params.name,
    description: params.description,
    position: {
      longitude: params.location.coordinates[0],
      latitude: params.location.coordinates[1],
    },
    createdAt: params.created_at,
  };
}
