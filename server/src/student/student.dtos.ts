import { IsDefined, IsNumber } from "class-validator";

export class GetStudentSkip {
    @IsDefined()
    @IsNumber()
    studentsLength: number;
  }