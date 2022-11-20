import {
  Get,
  Req,
  Body,
  Post,
  Param,
  UsePipes,
  UseGuards,
  Controller,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { AuthService } from '@/module/auth/auth.service';

import { CreateUserDto } from './dto/create-user.dto';

import { User } from '@/common/interface/user.interface';
import { AuthRequest } from '@/common/interface/route.interface';

import { JWT, LOCAL } from '@/common/constants/guard.constant';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard(JWT))
  async findAll() {
    const data = await this.userService.findAll();

    return { data };
  }

  @Get('/me')
  @UseGuards(AuthGuard(JWT))
  async me(@Req() req: AuthRequest) {
    const { user } = req;

    const data = await this.userService.me(user.id);

    return { data };
  }

  @Get('/:id')
  @UseGuards(AuthGuard(JWT))
  async findOrFail(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOrFail(id);

    return { data };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: CreateUserDto) {
    const data: User = await this.userService.create(user);

    const token: string = this.authService.generateToken(data);

    return { data: { ...data, token } };
  }

  @Post('/login')
  @UseGuards(AuthGuard(LOCAL))
  login(@Req() req: AuthRequest) {
    const data = { token: this.authService.generateToken(req.user) };

    return { data };
  }
}
