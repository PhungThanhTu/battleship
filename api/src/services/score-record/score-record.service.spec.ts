import { Test, TestingModule } from '@nestjs/testing';
import { ScoreRecordService } from './score-record.service';

describe('ScoreRecordService', () => {
  let service: ScoreRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreRecordService],
    }).compile();

    service = module.get<ScoreRecordService>(ScoreRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
