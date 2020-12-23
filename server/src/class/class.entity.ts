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
export class Classs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  school: number;

  @ManyToMany(
    type => Game,
    game => game.classes,{eager:true}
  )
  @JoinTable({
    joinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
  })
  games: Game[];

  @ManyToMany(
    type => Student,
    student => student.classs,{eager:true}
  )
  @JoinTable({
    joinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  student: Student[];

  @ManyToMany(
    type => Teacher,
    teacher => teacher.classes,{eager:true}
  )
  @JoinTable({
    joinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
  })
  teacher: Teacher[];
}
// @ManyToOne(type => School, school => school.id)
