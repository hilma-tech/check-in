import { Classroom } from 'src/classroom/classroom.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  day: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;


  @ManyToOne(
    type => Classroom,
    classroom => classroom.id,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'classroom_id' })
  classroom_id: number;

}