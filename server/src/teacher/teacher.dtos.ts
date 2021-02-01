import { IsDefined, IsNumber } from "class-validator";

export class GetTeacherSkip {
  @IsDefined()
  @IsNumber()
  teachersLength: number;
}

export class TeacherIdDto {
  @IsDefined()
  @IsNumber()
  teacherId: number;
}