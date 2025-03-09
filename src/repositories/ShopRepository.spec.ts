import { ShopRepository } from './ShopRepository.js';
import { describe, it, expect } from 'vitest';

describe('ShopRepository', () => {
  it('should retrieve shop list', async () => {
    // Given
    const shopRepository = new ShopRepository();

    // When
    const shopListSchema = await shopRepository.findMany({
      page: 1,
      limit: 10,
    });

    // Then
    expect(shopListSchema.length).toBe(2);
  });
});
