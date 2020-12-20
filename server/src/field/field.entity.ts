import { Game } from 'src/game/game.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { GameType } from './game.type.enum';
import { IsDefined, IsString, Length, Matches, IsEnum, IsNumber, ValidateNested } from 'class-validator';

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
