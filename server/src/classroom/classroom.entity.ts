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
    game => game.classrooms,{eager:true}
  )
  @JoinTable({
    name: "classroom_game",
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

  @ManyToMany(
    type => Student,
    student => student.classroom,{eager:true}
  )
  @JoinTable({
    joinColumn: {
      name: 'classroom_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  student?: Student[];

  @ManyToMany(
    type => Teacher,
    teacher => teacher.classroom,{eager:true}
  )
  @JoinTable({
    joinColumn: {
      name: 'classroom_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
  })
  teacher?: Teacher[];
}
// @ManyToOne(type => School, school => school.id)
