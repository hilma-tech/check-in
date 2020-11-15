import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game_name: string;

  @Column()
  description: string;

  @Column()
  requirements: string;

  @Column()
  photo: string;

  @Column()
  suspended: boolean;
}