import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsNumberString, IsString, Length, Matches, ValidateNested } from 'class-validator';


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
    index: number
}

export class allPermissions {

    @IsDefined()
    @IsString()
    @Length(1)
    @Matches(/^[\u0590-\u05EA]+$/)
    day: string

    @IsDefined()
    @IsNumber()
    classId: number
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => Permission)
    permissions: Permission[];
}


