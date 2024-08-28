import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prismaService:PrismaService){}
  
  async registerUser(
    userName: string,
    fullName: string,
    CID: string,
    email: string,
    contact: string,
    jobDesignation: string,
    password: string
  ) {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user in the database
      const user = await this.prismaService.user.create({
        data: {
          userName,
          fullName,
          CID,
          email,
          contact,
          jobDesignation,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(`Failed to register user: ${error.message}`);
    }
  }

  async findOne(condition: any) {
    try{
      const user = await this.prismaService.user.findUnique({
        where: condition,
      });

      if (!user) {
        throw new BadRequestException('Admin not found');
      }

      return user;
    }catch (error) {
      throw new BadRequestException(`Failed to find user: ${error.message}`)
    }
  }

  async remove(id: string): Promise<User> {
    try {

      const user = await this.prismaService.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return await this.prismaService.user.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  //user update

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateData,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
  
}
