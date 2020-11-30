import { Field } from 'src/field/field.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, MinKey } from 'typeorm';
import { IsDefined, IsString, Length, Matches, IsBoolean } from 'class-validator';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => Field,
    field => field.game,
  )
  fields: Field[];

  @IsDefined()
  @IsString()
  @Length(4, 20)
  @Matches(/[\u0590-\u05FF]{4,20}/)
  @Column({ type: 'varchar', length: 50, unique: true })
  game_name: string;

  @IsDefined()
  @IsString()
  @Length(4, 150)
  @Matches(/[\u0590-\u05FF]{4,150}/)
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @IsDefined()
  @IsString()
  @Length(4, 150)
  @Matches(/[\u0590-\u05FF]{4,150}/)
  @Column({ type: 'varchar', length: 255 })
  requirements: string;
  
  @IsDefined()
  @IsString()
  @Length(4, 1000)
  @Column({
    type: 'varchar',
    length: 1000,
    default: 'blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',
  })
  image: string;

  @IsDefined()
  @IsBoolean()
  @Column({ type: 'bit', default: false })
  suspended: boolean;
}
