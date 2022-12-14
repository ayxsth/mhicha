import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';

import { BalanceService } from './balance.service';
import { UserService } from '@/module/user/user.service';

import { SendBalanceDto } from './dto/send-balance.dto';
import { LoadBalanceDto } from './dto/load-balance.dto';

import { JWT } from '@/common/constants/guard.constant';

import { UserFindField } from '@/common/enums/user.enum';

import { User } from '@/common/interface/user.interface';
import { AuthRequest } from '@/common/interface/route.interface';
import { SelfTransferInterceptor } from '@/interceptors/self-transfer.interceptor';

@UseGuards(AuthGuard(JWT))
@UsePipes(ValidationPipe)
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService, private readonly userService: UserService) {}

  @UseInterceptors(SelfTransferInterceptor)
  @Post('/send')
  async send(@Req() req: AuthRequest, @Body() transfer: SendBalanceDto) {
    const receiver: User = await this.userService.findByOrFail(UserFindField.EMAIL, transfer.email);

    const data = await this.balanceService.transfer(req.user, receiver, transfer);

    return { data };
  }

  @Post('/load')
  async load(@Req() req: AuthRequest, @Body() transfer: LoadBalanceDto) {
    const data = await this.balanceService.load(req.user.id, transfer);

    return { data };
  }
}
