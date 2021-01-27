import { Test, TestingModule } from '@nestjs/testing';
import { ClassFieldService } from './class-field.service';

describe('ClassFieldService', () => {
  let service: ClassFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassFieldService],
    }).compile();

    service = module.get<ClassFieldService>(ClassFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
