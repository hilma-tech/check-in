import {
  IsDefined,
  IsInstance,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';



export class DataValueDto {
  @IsDefined()
  @IsNumber()
  @IsPositive()
  id: number;
  @IsDefined()
  @IsString()
  value: string;
}

export class FieldDataDto {
  @IsDefined()
  @IsString()
  @Length(4, 50)
  name: string;
  @IsDefined()
  @IsString()
  @Length(4, 50)
  selection: string;
  @IsDefined()
  @IsInstance(DataValueDto)
  value: [{ id: number; value: string }];
  @IsDefined()
  @IsNumber()
  @IsPositive()
  order: number;
}

export class SaveFieldDto {
  @IsDefined()
  @IsInstance(FieldDataDto)
  data: [
    {
      name: string;
      selection: string;
      value: [{ id: number; value: string }];
      order: number;
    },
  ];
  @IsDefined()
  @IsNumber()
  id: number;
}
