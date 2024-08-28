import { Injectable, OnModuleInit, OnModuleDestroy, NotFoundException } from '@nestjs/common';
import { Admin, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async createAdmin(userName: string, email: string, hashedPassword: string) {
    return await this.admin.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });
  }

}
