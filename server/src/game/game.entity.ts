import { Field } from 'src/field/field.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import {
  IsDefined,
  IsString,
  Length,
  Matches,
  IsBoolean,
} from 'class-validator';
import { Classroom } from 'src/classroom/classroom.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => Field,
    field => field.game,
    { onDelete: 'CASCADE' }
  )
  fields: Field[];

  @ManyToMany(
    type => Classroom,
    classroom => classroom.games,
    { onDelete: 'CASCADE' }
  )
  classrooms: Classroom[];

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/^[A-Za-z\u0590-\u05EA"'-\.\s]+$/)
  @Column({ type: 'varchar', length: 30, unique: true })
  game_name: string;

  @Length(0, 30)
  @Matches(/^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Length(0, 100)
  @Matches(/^$|^[\u0590-\u05FFa-zA-Z0-9\.\s]+$/)
  @Column({ type: 'varchar', length: 255, nullable: true })
  requirements: string;

  
  @Matches(/^$|(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
  @Column({ type: 'varchar', length: 255, nullable: true })
  video_link: string

  @IsDefined()
  @IsString()
  @Length(4, 1000)
  @Column({
    type: 'varchar',
    length: 1000,
    default: '/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg',
  })
  image: string;

  @IsDefined()
  @IsBoolean()
  @Column({ type: 'bit', default: false })
  suspended: boolean;
}
