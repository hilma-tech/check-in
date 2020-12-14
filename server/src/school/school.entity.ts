import { Field } from "src/field/field.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  MinKey
} from "typeorm";
import {
  IsDefined,
  IsString,
  Length,
  Matches,
  IsBoolean
} from "class-validator";

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: "varchar", length: 50})
  name: string;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Column({ type: "varchar", length: 50})
  city: string;
}
