import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

export class GetSchoolSkip {
  @IsDefined()
  @IsString()
  @IsNumberString()
  schoolsLength: string;
}

export class SchoolIdDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  schoolId: string;
}

export class ErrorDto {
  @IsOptional()
  @IsString()
  @Length(1, 10)
  toShow: string;
  @IsOptional()
  @IsString()
  @Length(0, 30)
  mess: string;
}

export class SearchValDto {
  @IsDefined()
  @IsString()
  val: string;
}

export class ChosenTeacherDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  @Matches(/[A-Za-z\u0590-\u05EA0-9"'-/s]/)
  name: string;
  @IsOptional()
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z\u0590-\u05EA"'-]+$/)
  first_name: string;
  @IsOptional()
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z\u0590-\u05EA"'-]+$/)
  last_name: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  @Length(8, 15)
  @Matches(/^[A-Za-z\u0590-\u05EA0-9!@#$"%^,.&*()_+=[\]{}'-;:\\|<>/?~`]+$/)
  password: string;
}

export class ClassInfoDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  @Matches(/[A-Za-z\u0590-\u05EA0-9"'-]/)
  name: string;
  @IsOptional()
  classNameError: ErrorDto;
  @IsOptional()
  chosenTeachers: ChosenTeacherDto[];
}

export class AddSchoolInfoDto {
  @IsDefined()
  schoolNameError: ErrorDto;
  @IsDefined()
  schoolCityError: ErrorDto;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[A-Za-z\u0590-\u05EA0-9"'-]/)
  schoolName: string;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[A-Za-z\u0590-\u05EA]/)
  schoolCity: string;
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassInfoDto)
  classes: ClassInfoDto[];
}

export class EditSchoolInfoDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[A-Za-z\u0590-\u05EA0-9"'-]/)
  schoolName: string;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[A-Za-z\u0590-\u05EA]/)
  schoolCity: string;
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassInfoDto)
  classes: ClassInfoDto[];
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassInfoDto)
  removedClasses: ClassInfoDto[];
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClassInfoDto)
  existClasses: ClassInfoDto[];
}

