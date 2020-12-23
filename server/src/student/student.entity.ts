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
import { Classs } from "src/class/class.entity";

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

  @ManyToMany(type=>Classs, classs => classs.games)
  classs: Classs[];
}
