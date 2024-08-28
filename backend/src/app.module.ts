import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './Authentication/User/user.module';
import { PrismaModule } from './prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './Authentication/Admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    AdminModule,
    userModule,
    JwtModule.register({
      secret: "secret",
      signOptions:{
          expiresIn:"1hr"
      },
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
