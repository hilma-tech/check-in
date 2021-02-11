import { Classroom } from 'src/classroom/classroom.entity';
import { Field } from 'src/field/field.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassroomField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  new_value: string;

  @ManyToOne(
    type => Classroom,
    classroom => classroom.id,
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'classroom_id' })
  classroom_id: number;

  @ManyToOne(
    type => Field,
    field => field.id,
  )
  @JoinColumn({ name: 'field_id', referencedColumnName: 'id' })
  field_id: number;
}
