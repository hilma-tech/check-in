import {
  IsDate,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Classroom } from 'src/classroom/classroom.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayEnum } from './day.enum';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @IsDate()
  @Column({ nullable: true })
  date: Date;

  @IsDefined()
  @IsString()
  @Length(1)
  @Matches(/^[\u0590-\u05FF]+$/)
  @IsEnum(DayEnum)
  @Column({ nullable: true })
  day: DayEnum;

  @IsDefined()
  @IsString()
  @Length(5)
  @Matches(/^[0-9:]+$/)
  @Column()
  start_time: string;

  @IsDefined()
  @IsString()
  @Length(5)
  @Matches(/^[0-9:]+$/)
  @Column()
  end_time: string;

  @ManyToOne(
    type => Classroom,
    classroom => classroom.id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'classroom_id' })
  classroom_id: number;
}
