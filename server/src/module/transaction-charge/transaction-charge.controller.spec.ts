import { Test, TestingModule } from '@nestjs/testing';
import { TransactionChargeController } from './transaction-charge.controller';

describe('TransactionChargeController', () => {
  let controller: TransactionChargeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionChargeController],
    }).compile();

    controller = module.get<TransactionChargeController>(TransactionChargeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
