import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50})
  game_name: string;

  @Column({type: 'varchar', length: 255})
  description: string;

  @Column({type: 'varchar', length: 255})
  requirements: string;

  @Column({type: 'varchar', length: 1000})
  photo: string;

  @Column({type: 'bit', default: false})
  suspended: boolean;
}