import { ShopRepository } from '../src/repositories/ShopRepository.js';
import prisma from '../src/infrastructure/database/prisma.js';

const shopRepository = new ShopRepository();

const DUMMY_SHOP_DATA = [
  {
    name: 'Shop1',
    description: 'Shop1 description',
    position: { latitude: 35.681236, longitude: 139.767125 },
  },
  {
    name: 'Shop2',
    description: 'Shop2 description',
    position: { latitude: 35.681236, longitude: 139.767125 },
  },
];

async function main() {
  await Promise.all(DUMMY_SHOP_DATA.map((shop) => shopRepository.create(shop)));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
