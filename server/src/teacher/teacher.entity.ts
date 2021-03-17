import {
  ChildEntity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsDefined, IsString, Length } from 'class-validator';
import { User } from '@hilma/auth-nest';
import { School } from 'src/school/school.entity';
import { Classroom } from 'src/classroom/classroom.entity';

@ChildEntity()
export class Teacher extends User {
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: 'varchar', length: 30 })
  first_name: string;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: 'varchar', length: 30 })
  last_name: string;

  @ManyToMany(
    type => Classroom,
    classroom => classroom.teachers,
  )
  classroomTeacher: Classroom[];

  @ManyToOne(
    () => School,
    school => school.teachers,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'school_id' })
  school: number;

  @Column({ default: 0, type: "tinyint" })
  emailVerified: number

  @Column({ nullable: true, length: 150 })
  verificationToken: string
}
