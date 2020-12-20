import {
    ChildEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  MinKey,
  Timestamp
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

@ChildEntity()
export class Teacher extends User{
  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: "varchar", length: 50})
  name: string;

  @OneToMany(
    type => School,
    school => school.id
  )
  schoolId: School;
}
