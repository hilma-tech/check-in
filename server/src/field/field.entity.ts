import { Game } from 'src/game/game.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GameType } from './game.type.enum';
import { IsPositive,IsDefined, IsString, Length, Matches, IsEnum, IsNumber } from 'class-validator';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @Length(4, 20)
  @Matches(/[\u0590-\u05FF]{4,20}/)
  @Column({ type: 'varchar', length: 50 })
  field_name: string;

  @IsDefined()
  @IsEnum(GameType)
  @Column({ type: 'enum', enum: GameType, default: GameType.TEXT })
  type: string;

  @ManyToOne(type => Game, game => game.id)
  game: number;

  @IsDefined()
  @IsString()
  @Length(4, 150)
  @Column({ type: 'varchar', length: 150 })
  default_value: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  order: number;
}
