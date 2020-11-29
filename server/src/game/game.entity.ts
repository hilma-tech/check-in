import { Field } from 'src/field/field.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Field, field => field.game)
  fields: Field[];

  @Column({ type: 'varchar', length: 50, unique: true })
  game_name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  requirements: string;

  @Column({ type: 'varchar', length: 1000, default: "blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c" })
  image: string;

  @Column({ type: 'bit', default: false })
  suspended: boolean;
}
