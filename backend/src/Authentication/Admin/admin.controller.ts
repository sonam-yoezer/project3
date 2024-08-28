import { BadRequestException, Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';


@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtService:JwtService
) {}

@Post('registerAdmin')
async registerAdmin(
    @Body('userName') userName: string,
    @Body('email') email: string,
    @Body('password') password: string,
) {
    try {
        const newAdmin = await this.adminService.registerAdmin(userName, email, password);
        return { message: 'Admin registered successfully', admin: newAdmin};
    } catch (error) {
        throw new Error(`Failed to register user: ${error.message}`);
    }
}

@Post('adminLogin')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const admin = await this.adminService.findOne({ email });

      if (!admin) {
        throw new BadRequestException('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      const jwt = await this.jwtService.signAsync({ payload: { id: admin.id } });

      response.cookie('jwt', jwt, { httpOnly: true });

      return { message: 'Generated Token' };
    } catch (error) {
      throw new BadRequestException(`Failed to login: ${error.message}`);
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', {
      httpOnly: true, // Ensure this matches how the cookie was set
      secure: process.env.NODE_ENV === 'production', // Make sure this matches the environment
      sameSite: 'lax', // Adjust based on your needs
      path: '/', // Ensure this matches the path used when setting the cookie
    });

    return {
      message: 'Success',
    };
  }

@Delete(':id')
async remove(@Param('id') id: string) {
  try {
    const deletedAdmin = await this.adminService.remove(id);
    return {
      message: 'Admin deleted successfully',
      admin: deletedAdmin,
    };
  } catch (error) {
    // Handle the case where the deletion fails
    throw new BadRequestException(`Failed to delete admin: ${error.message}`);
  }
}
}
