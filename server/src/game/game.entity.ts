import { Field } from "src/field/field.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  MinKey,
  ManyToMany,
  JoinTable
} from "typeorm";
import {
  IsDefined,
  IsString,
  Length,
  Matches,
  IsBoolean
} from "class-validator";
import { Classs } from "src/class/class.entity";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => Field,
    field => field.game
  )
  fields: Field[];

  @ManyToMany(type=>Classs, classs => classs.games)
  classes: Classs[];

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[\u0590-\u05FF]/)
  @Column({ type: "varchar", length: 50, unique: true })
  game_name: string;

  @IsDefined()
  @IsString()
  @Length(1, 260)
  @Matches(/[\u0590-\u05FF]/)
  @Column({ type: "varchar", length: 255 })
  description: string;

  @IsDefined()
  @IsString()
  @Length(1, 260)
  @Matches(/[\u0590-\u05FF]/)
  @Column({ type: "varchar", length: 255 })
  requirements: string;

  @IsDefined()
  @IsString()
  // @Length(4, 1000)
  @Column({
    type: "varchar",
    length: 1000,
    default: "/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg"
  })
  image: string;

  @IsDefined()
  @IsBoolean()
  @Column({ type: "bit", default: false })
  suspended: boolean;

}
