import { Game } from 'src/game/game.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field_name: string;

  @Column()
  type: string;

  @OneToOne(type => Game)
    @JoinColumn()
    photo: Game;

  @Column()
  default_value: string;

  @Column()
  order: number;
}