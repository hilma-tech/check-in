import { Game } from 'src/game/game.entity';
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

  @ManyToMany(type=>Teacher, teacher => teacher.classrooms)
  teachers: Teacher[];

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
}
// @ManyToOne(type => School, school => school.id)
