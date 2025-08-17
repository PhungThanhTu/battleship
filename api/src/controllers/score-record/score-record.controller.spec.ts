import { Test, TestingModule } from '@nestjs/testing';
import { ScoreRecordController } from './score-record.controller';

describe('ScoreRecordController', () => {
  let controller: ScoreRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreRecordController],
    }).compile();

    controller = module.get<ScoreRecordController>(ScoreRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
