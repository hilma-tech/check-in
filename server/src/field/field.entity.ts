import { Game } from 'src/game/game.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GameType } from './game.type.enum';
import { IsDefined, IsString, Length, Matches, IsEnum, IsNumber } from 'class-validator';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[\u0590-\u05FF]/)
  @Column({ type: 'varchar', length: 50 })
  field_name: string;

  @IsDefined()
  @IsEnum(GameType)
  @Length(1, 30)
  @Column({ type: 'enum', enum: GameType, default: GameType.TEXT })
  type: string;

  @ManyToOne(type => Game, game => game.id)
  game: number;

  @IsDefined()
  @IsString()
  // @Length(1, 30)
  @Column({ type: 'varchar', length: 150 })
  default_value: string;

  @IsDefined()
  @IsNumber()
  @Column({ type: 'int' })
  order: number;
}
