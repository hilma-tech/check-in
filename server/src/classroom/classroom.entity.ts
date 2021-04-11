import { Game } from 'src/game/game.entity';
import { School } from 'src/school/school.entity';
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
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    () => School,
    school => school.classrooms,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({name: 'school_id'})
  school_id: number;

  @ManyToMany(
    type => Game,
    game => game.classrooms,
    { eager: true , onDelete: 'CASCADE'},
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

  @ManyToMany(
    type => Student,
    student => student.classroomStudent,
    { eager: true , onDelete: 'CASCADE'},
  )
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

  @ManyToMany(
    type => Teacher,
    teacher => teacher.classroomTeacher,
    { eager: true, onDelete: 'CASCADE' },
  )
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
