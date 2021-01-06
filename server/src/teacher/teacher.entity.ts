import {
    ChildEntity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn
} from "typeorm";
import {
  IsDefined,
  IsString,
  Length,
  Matches,
  IsBoolean
} from "class-validator";
import { User } from '@hilma/auth-nest';
import { School } from "src/school/school.entity";
import { Classroom } from "src/classroom/classroom.entity";

@ChildEntity()
export class Teacher extends User{
  @IsDefined()
  @IsString()
  @Length(1, 50)
  @Column({ type: "varchar", length: 50})
  first_name: string;

  @IsDefined()
  @IsString()
  @Length(1, 50)
  @Column({ type: "varchar", length: 50})
  last_name: string;

  @ManyToMany(
    type => Classroom,
    classroom => classroom.teachers
  ) 
  classrooms: Classroom[];

  @ManyToOne(() => School, school => school.teachers)
  @JoinColumn({referencedColumnName: "id", name: 'school_id'})
  school: number;
}
