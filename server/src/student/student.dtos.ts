import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

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
  @Length(8, 15)
  password: string;

  @IsDefined()
  @IsString()
  username: string;
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

export class ClassForSaveDto{
  @IsDefined()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsString()
  name: string;
}

export class UserRegisterDto {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsNumber()
  schoolId: number;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => ClassForSaveDto)
  classrooms: ClassForSaveDto[];
}

export class ExcelUserRegisterDto {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsString()
  schoolName: string;

  @IsDefined()
  @IsNumber()
  schoolId: number;

  @IsDefined()
  @ValidateNested({ each: true })
  userClassrooms: string[];

  @ValidateNested({ each: true })
  @Type(() => ClassForSaveDto)
  classrooms: ClassForSaveDto[];
}

export class StudentPassword {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  @Length(8, 15)
  password: string;

}


