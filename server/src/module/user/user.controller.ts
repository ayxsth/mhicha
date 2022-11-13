import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const data = await this.userService.findAll();

    return { data };
  }

  @Get('/:id')
  async findOrFail(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOrFail(id);

    return { data };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: CreateUserDto) {
    const data = await this.userService.create(user);

    return { data };
  }
}
