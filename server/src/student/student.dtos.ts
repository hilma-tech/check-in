import { IsDefined, IsEmail, IsNumber, IsNumberString, IsString, Length } from "class-validator";

export class GetStudentSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
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
  @IsNumberString()
  classId: string;
}


export class ClassroomIdDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  classId: string;

  @IsDefined()
  @IsString()
  @IsNumberString()
  dataLength: string;
}