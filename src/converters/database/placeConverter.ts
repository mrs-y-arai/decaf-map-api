import { type PlaceSchema } from '~/schema/Place.js';
import { type Place } from '~/models/Place.js';

export function placeConverter(params: PlaceSchema): Place {
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
