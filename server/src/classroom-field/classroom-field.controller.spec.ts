import { Test, TestingModule } from '@nestjs/testing';
import { ClassroomFieldController } from './classroom-field.controller';

describe('ClassroomFieldController', () => {
  let controller: ClassroomFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassroomFieldController],
    }).compile();

    controller = module.get<ClassroomFieldController>(ClassroomFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
