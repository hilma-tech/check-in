import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { DayEnum } from './day.enum';

export class Permission {
  @IsDefined()
  @IsString()
  @Length(5)
  @Matches(/^[0-9:]+$/)
  startTime: string;

  @IsDefined()
  @IsString()
  @Length(5)
  @Matches(/^[0-9:]+$/)
  endTime: string;

  @IsOptional()
  @IsNumber()
  index: number;
}

export class allPermissions {
  @IsDefined()
  @IsString()
  @Length(1)
  @IsEnum(DayEnum)
  @Matches(/^[\u0590-\u05EA]+$/)
  day: DayEnum;

  @IsDefined()
  @IsNumber()
  classId: number;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => Permission)
  permissions: Permission[];
}

export class PermissionDelete {
  @IsDefined()
  @IsString()
  @Length(5)
  @Matches(/^[0-9:]+$/)
  start_time: string;

  @IsDefined()
  @IsString()
  @Length(5)
  @Matches(/^[0-9:]+$/)
  end_time: string;

  @IsDefined()
  @IsNumber()
  classroom_id: number;

  @IsDefined()
  @IsString()
  @Length(1)
  @IsEnum(DayEnum)
  @Matches(/^[\u0590-\u05FF]+$/)
  day: DayEnum;
}

export class getpermission {
  @IsDefined()
  @IsNumber()
  classId: number;
}

export class DayReqPermissionsDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  classId: string;

  @IsDefined()
  @IsString()
  @Length(1)
  @IsEnum(DayEnum)
  @Matches(/^[\u0590-\u05FF]+$/)
  day: string;
}

