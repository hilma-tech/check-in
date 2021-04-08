import { IsDefined, IsNumber, IsNumberString, IsString } from 'class-validator';

export class getCGFDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  game_id: string;
  @IsDefined()
  @IsString()
  @IsNumberString()
  classroom_id: string;
  @IsDefined()
  @IsString()
  datatype: string;
}

export class removeFFromCDto {
  @IsDefined()
  @IsNumber()
  gameId: number;

  @IsDefined()
  @IsNumber()
  classId: number;
}

export class GetClassGameFieldsDto {
  @IsDefined()
  @IsString()
  @IsNumberString()
  game_id: string;
  @IsDefined()
  @IsString()
  @IsNumberString()
  classroom_id: string;
}