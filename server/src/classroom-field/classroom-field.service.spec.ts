import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomFieldService } from './classroom-field.service';

describe('ClassroomFieldService', () => {
  let service: ClassroomFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassroomFieldService],
    }).compile();

    service = module.get<ClassroomFieldService>(ClassroomFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
