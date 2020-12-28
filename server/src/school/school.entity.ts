import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  MinKey,
  ManyToMany,
  JoinTable,
  JoinColumn
} from "typeorm";
import {
  IsDefined,
  IsString,
  Length,
  Matches,
  IsBoolean
} from "class-validator";
import { Student } from "src/student/student.entity";
import { Teacher } from "src/teacher/teacher.entity";

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: "varchar", length: 50 })
  name: string;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: "varchar", length: 50 })
  city: string;


  @OneToMany(
    () => Student,
    student => student.school
  )
  students: Student[];

  @OneToMany(
    () => Teacher,
    teacher => teacher.school
  )
  teachers: Teacher[];
}
