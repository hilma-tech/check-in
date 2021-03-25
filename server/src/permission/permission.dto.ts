import { IsDefined, IsNumber, IsNumberString, IsString, Length, Matches } from 'class-validator';


export class permissionInfoSave {
    @IsDefined()
    @IsString()
    @Length(4, 6)
    @Matches(/^[0-9:]+$/)
    startTime: string;

    @IsDefined()
    @IsString()
    @Length(4, 6)
    @Matches(/^[0-9:]+$/)
    endTime: string;

    @IsDefined()
    @IsNumber()
    classId: number

}
