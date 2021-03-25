import { join } from 'path';
import { Classroom } from 'src/classroom/classroom.entity';
import { Game } from 'src/game/game.entity';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'classroom_id' })
  classroom_id: number;

}