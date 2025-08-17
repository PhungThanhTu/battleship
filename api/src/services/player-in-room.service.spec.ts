import { Test, TestingModule } from '@nestjs/testing';
import { PlayerInRoomService } from './player-in-room.service';

describe('PlayerInRoomService', () => {
  let service: PlayerInRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerInRoomService],
    }).compile();

    service = module.get<PlayerInRoomService>(PlayerInRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
