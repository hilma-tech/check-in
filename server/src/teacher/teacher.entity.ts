import {
    ChildEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  MinKey,
  Timestamp,
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
  @Length(1, 30)
  @Column({ type: "varchar", length: 50})
  name: string;

  @ManyToMany(
    type => Classroom,
    classroom => classroom.teachers
  )
  @JoinTable({
    joinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'classroom_id',
      referencedColumnName: 'id',
    },
  })
  classrooms: Classroom[];

  @ManyToOne(() => School, school => school.teachers)
  @JoinColumn({referencedColumnName: "id", name: 'school_id'})
  school: number;
}
