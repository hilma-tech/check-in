import {
    ChildEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  MinKey,
  ManyToOne,
  JoinColumn,
  ManyToMany
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
import { Classroom } from "src/class/classroom.entity";

@ChildEntity()
export class Student extends User{
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: "varchar", length: 50})
  name: string;

  @ManyToOne(() => School, School => School.students)
  @JoinColumn({referencedColumnName: "id", name: 'school_id'})
  School?: number;

  @ManyToMany(type=>Classroom, classroom => classroom.games)
  classroom: Classroom[];
}
