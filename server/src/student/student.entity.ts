import {
  ChildEntity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import {
  IsDefined,
  IsString,
  Length,
} from 'class-validator';
import { User } from '@hilma/auth-nest';
import { School } from 'src/school/school.entity';
import { Classroom } from 'src/classroom/classroom.entity';

@ChildEntity()
export class Student extends User {
  @IsDefined()
  @IsString()
  @Length(1, 50)
  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @IsDefined()
  @IsString()
  @Length(1, 50)
  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @ManyToOne(
    () => School,
    school => school.students,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'school_id' })
  school: number;

  
  @ManyToMany(
    type => Classroom,
    classroom => classroom.students,
  )
  classroomStudent: Classroom[];
}
