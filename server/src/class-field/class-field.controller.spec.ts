import { Test, TestingModule } from '@nestjs/testing';
import { ClassFieldController } from './class-field.controller';

describe('ClassFieldController', () => {
  let controller: ClassFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassFieldController],
    }).compile();

    controller = module.get<ClassFieldController>(ClassFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
