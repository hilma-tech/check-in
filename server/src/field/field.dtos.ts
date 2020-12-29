import {
  IsDefined,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DataValueDto {
  @IsDefined()
  @IsNumber()
  id: number;
  @IsDefined()
  @IsString()
  // @Length(1, 30)
  value: string;
}

export class FieldDataDto {
  @IsDefined()
  @IsString()
  @Length(1, 50)
  name: string;
  @IsDefined()
  @IsString()
  @Length(1, 30)
  selection: string;
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => DataValueDto)
  value: DataValueDto[];
  @IsDefined()
  @IsNumber()
  order: number;
}

export class SaveFieldDto {
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FieldDataDto)
  data: FieldDataDto[];
  @IsDefined()
  @IsNumber()
  id: number;
}
