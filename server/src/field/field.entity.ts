import { Game } from 'src/game/game.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GameType } from './game.type.enum';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  field_name: string;

  @Column({ type: 'enum', enum: GameType, default: GameType.TEXT })
  type: GameType;

  @Column({type: 'int', default: 3})
  game_id: any;

  @ManyToOne(type => Game)
  @JoinColumn({ name: 'game_id', referencedColumnName: 'id' })
  game: Game;

  @Column({ type: 'varchar', length: 150 })
  default_value: string;

  @Column({ type: 'int' })
  order: number;
}
