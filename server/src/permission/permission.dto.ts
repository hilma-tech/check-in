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
    @IsString()
    @Length(1)
    @Matches(/^[\u0590-\u05EA]+$/)
    day: string


    @IsDefined()
    @IsNumber()
    classId: number

}



// export class FieldDataDto {
//     @IsDefined()
//     @IsString()
//     @Length(1, 50)
//     @Matches(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
//     name: string;
//     @IsDefined()
//     @IsString()
//     @Length(1, 30)
//     selection: string;
//     @IsDefined()
//     @ValidateNested({ each: true })
//     @Type(() => DataValueDto)
//     value: DataValueDto[];
//     @IsDefined()
//     @IsNumber()
//     order: number;
// }

// export class SaveFieldDto {
//     @IsDefined()
//     @ValidateNested({ each: true })
//     @Type(() => FieldDataDto)
//     data: FieldDataDto[];
//     @IsDefined()
//     @IsNumber()
//     id: number;
// }