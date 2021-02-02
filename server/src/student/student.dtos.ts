import { IsDefined, IsNumber, IsString } from "class-validator";

export class GetStudentSkip {
  @IsDefined()
  @IsString()
  studentsLength: string;
}

export class StudentIdDto {
  @IsDefined()
  @IsString()
  id: string;
}

export class GamesForClassDto {
  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  classId: string;
}