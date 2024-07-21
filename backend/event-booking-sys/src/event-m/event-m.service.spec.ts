import { Test, TestingModule } from '@nestjs/testing';
import { EventMService } from './event-m.service';

describe('EventMService', () => {
  let service: EventMService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventMService],
    }).compile();

    service = module.get<EventMService>(EventMService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
