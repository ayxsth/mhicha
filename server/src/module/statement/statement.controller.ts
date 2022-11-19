import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { StatementService } from './statement.service';

import { JWT } from '@/common/constants/guard.constant';

import { AuthRequest } from '@/common/interface/route.interface';

@Controller('statements')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  @UseGuards(AuthGuard(JWT))
  find(@Req() req: AuthRequest) {
    return this.statementService.find(req.user.id);
  }
}
