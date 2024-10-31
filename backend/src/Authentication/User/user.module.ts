import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth.module';


@Module({
  imports: [
    JwtModule.register({
      secret: "secret",
      signOptions:{
          expiresIn:"1hr"
      },
  }),
  AuthModule
  ],
  controllers: [userController],
  providers: [UserService, PrismaService],
})
export class userModule {}
