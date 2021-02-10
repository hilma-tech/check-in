import { IsDefined, IsNumber, IsNumberString, IsString } from "class-validator";

export class GetTeacherSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
  teachersLength: string;
}

export class GetClassSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
  classesLength: string;
}

export class TeacherIdDto {
  @IsDefined()
  @IsString()
  teacherId: string;
}

export class TeacherInfoDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  type: string;

  @IsDefined()
  @IsString()
  roles: string[];

  @IsDefined()
  @IsString()
  roleKeys: string[];

  @IsDefined()
  @IsNumber()
  iat: number;

  @IsDefined()
  @IsNumber()
  exp: number;
}

