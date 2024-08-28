import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerAdmin(userName: string, email: string, password: string){
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newAdmin = await this.prismaService.admin.create({
       data: {
        userName,
        email,
        password: hashedPassword
       },
      });

      return newAdmin;
    } catch (error) {
      throw new BadRequestException(`Failed to register user: ${error.message}`);
    }
  }

  async findOne(condition: any) {
    try{
      const admin = await this.prismaService.admin.findUnique({
        where: condition,
      });

      if (!admin) {
        throw new BadRequestException('Admin not found');
      }

      return admin;
    }catch (error) {
      throw new BadRequestException(`Failed to find user: ${error.message}`)
    }
  }


  async remove(id: string): Promise<Admin> {
    try {

      const user = await this.prismaService.admin.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return await this.prismaService.admin.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
