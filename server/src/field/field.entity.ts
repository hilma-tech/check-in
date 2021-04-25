import { Game } from 'src/game/game.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsDefined,
  IsString,
  Length,
  Matches,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { GameType } from './game.type.enum';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @Length(1, 50)
  @Matches(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  @Column({ type: 'varchar', length: 50 })
  field_name: string;

  @IsDefined()
  @Length(1, 30)
  @IsEnum(GameType)
  @Column({ type: 'varchar', length: 50 })
  type: GameType;

  @IsOptional()
  @ManyToOne(
    type => Game,
    game => game.id,
    { onDelete: 'CASCADE' },

  )
  @JoinColumn({ referencedColumnName: 'id', name: 'game_id', })
  game?: number;

  @IsDefined()
  @IsString()
  @Column({ type: 'varchar', length: 150 })
  default_value: string;

  @IsDefined()
  @IsNumber()
  @Column({ type: 'int' })
  order: number;
}
