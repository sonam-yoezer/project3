import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AdminModule } from './Authentication/Admin/admin.module';

@Global()
@Module({
    imports: [
        AdminModule,
    ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
