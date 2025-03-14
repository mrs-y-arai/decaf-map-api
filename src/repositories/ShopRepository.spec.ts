import { ShopRepository } from './ShopRepository.js';
import { describe, it, expect } from 'vitest';

describe('ShopRepository', () => {
  it('should retrieve shop list', async () => {
    // Given
    const shopRepository = new ShopRepository();
    const shop = await shopRepository.create({
      name: 'Shop1',
      description: 'Shop1 description',
      position: { latitude: 35.681236, longitude: 139.767125 },
    });

    // When
    const shopListSchema = await shopRepository.findMany({
      page: 1,
      limit: 10,
    });

    // Then
    expect(shopListSchema.length).toBe(1);
    await shopRepository.delete(shop.id);
  });
});
