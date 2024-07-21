import { Test, TestingModule } from '@nestjs/testing';
import { EventMController } from './event-m.controller';
import { EventMService } from './event-m.service';

describe('EventMController', () => {
  let controller: EventMController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventMController],
      providers: [EventMService],
    }).compile();

    controller = module.get<EventMController>(EventMController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
