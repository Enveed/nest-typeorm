import { Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { Body, Delete, Param, Put } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.userService.fetchUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Post(':id/profile')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return await this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  async createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return await this.userService.createUserPost(id, createUserPostDto);
  }
}
