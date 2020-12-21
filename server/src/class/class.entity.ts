import { Game } from 'src/game/game.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
//   @ManyToOne(type => School, school => school.id)
  school: number;

  @ManyToMany(()=>Game)
  @JoinTable()
  games: Game[];
}
