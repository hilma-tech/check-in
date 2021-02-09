import { Classroom } from 'src/classroom/classroom.entity';
import { Field } from 'src/field/field.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassroomField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  new_value: string;

  @OneToOne(type => Classroom) 
  @JoinColumn({name: "classroom_id"}) 
   classroom_id: number;

  @OneToOne(type => Field)
  @JoinColumn({name: "field_id"})
  field_id: number;
}