import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOrFail(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOrFail(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: CreateUserDto) {
    const [id] = await this.userService.create(user);

    return this.userService.findOrFail(id);
  }
}
