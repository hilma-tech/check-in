import { Game } from 'src/game/game.entity';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  school_id: number;

  @ManyToMany(
    type => Game,
    game => game.classrooms,
    { eager: true },
  )
  @JoinTable({
    name: 'classroom_game',
    joinColumn: {
      name: 'classroom_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
  })
  games: Game[];

  @ManyToMany(type => Student)
  @JoinTable({
    name: 'student_classroom',
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
    joinColumn: {
      name: 'classroom_id',
      referencedColumnName: 'id',
    },
  })
  students: Student[];

  @ManyToMany(type => Teacher)
  @JoinTable({
    name: 'teacher_classroom',
    inverseJoinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
    joinColumn: {
      name: 'classroom_id',
      referencedColumnName: 'id',
    },
  })
  teachers: Teacher[];
}
