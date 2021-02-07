import { IsDefined, IsEmail, IsNumber, IsString, Length } from "class-validator";

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
  @Length(6,8)
  password: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  username: string;

  @IsDefined()
  @IsString()
  classId: string;
}