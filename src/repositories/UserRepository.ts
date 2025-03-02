import prisma from '~/infrastructure/database/prisma.js';
import { type PrismaClient } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public findById = async (id: string) => {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  };
}
