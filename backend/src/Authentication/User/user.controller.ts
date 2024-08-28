import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';



@Controller('users')
export class userController {
 constructor(
    private readonly userService: UserService,
    private jwtService:JwtService
) {}

@Post('registerUser')
async registerUser(
  @Body('userName') userName: string,
  @Body('fullName') fullName: string,
  @Body('CID') CID: string,
  @Body('email') email: string,
  @Body('contact') contact: string,
  @Body('jobDesignation') jobDesignation:string,
  @Body('password') password: string,
  @Body('conformPassword') conformPassword: string
) {
  try {
    // Validate that password and conformPassword match
    if (password !== conformPassword) {
      throw new BadRequestException('Password and confirm password do not match');
    }

    // Call the userService to handle the registration
    const newUser = await this.userService.registerUser(userName, fullName, CID, email, contact,jobDesignation, password);

    return { message: 'User registered successfully', user: newUser };
  } catch (error) {
    throw new BadRequestException(`Failed to register user: ${error.message}`);
  }
}

@Post('userLogin')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const user = await this.userService.findOne({ email });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      const jwt = await this.jwtService.signAsync({ payload: { id: user.id } });

      response.cookie('jwt', jwt, { httpOnly: true });

      return { message: 'Generated Token' };
    } catch (error) {
      throw new BadRequestException(`Failed to login: ${error.message}`);
    }
  }

  @Post('userLogout')
async logout(@Res({passthrough: true}) response: Response){
  response.clearCookie('jwt');

  return {
    message: 'sucsess'
  }
}

@Delete(':id')
async remove(@Param('id') id: string) {
  try {
    const deletedUser = await this.userService.remove(id);
    return {
      message: 'User deleted successfully',
      user: deletedUser,
    };
  } catch (error) {
    // Handle the case where the deletion fails
    throw new BadRequestException(`Failed to delete admin: ${error.message}`);
  }
}

@Put(':id')
async updateUser(
  @Param('id') id: string,
  @Body('userName') userName?: string,
  @Body('fullName') fullName?: string,
  @Body('CID') CID?: string,
  @Body('email') email?: string,
  @Body('contact') contact?: string,
  @Body('jobDesignation') jobDesignation?: string
) {
  try {

    const user = await this.userService.findOne({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const updateData = {
      ...(userName && { userName }),
      ...(fullName && { fullName }),
      ...(CID && { CID }),
      ...(email && { email }),
      ...(contact && { contact }),
      ...(jobDesignation && { jobDesignation })
    };


    const updatedUser = await this.userService.updateUser(id, updateData);

    return { message: 'User updated successfully', user: updatedUser };
  } catch (error) {
    throw new BadRequestException(`Failed to update user: ${error.message}`);
  }
}

  // New Endpoint to get a user by ID
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne({ id });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return { user };
    } catch (error) {
      throw new BadRequestException(`Failed to get user: ${error.message}`);
    }
  }

    // New Endpoint to get all users
    @Get()
    async getAllUsers() {
      try {
        const users = await this.userService.getAllUsers();
        return { users };
      } catch (error) {
        throw new BadRequestException(`Failed to get users: ${error.message}`);
      }
    }
}
