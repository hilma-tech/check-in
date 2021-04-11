import { Classroom } from 'src/classroom/classroom.entity';
import { Field } from 'src/field/field.entity';
import { Game } from 'src/game/game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassroomField {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Game,
    game => game.id,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'game_id' })
  game_id: number;

  @Column()
  new_value: string;

  @ManyToOne(
    type => Classroom,
    classroom => classroom.id,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ referencedColumnName: 'id', name: 'classroom_id' })
  classroom_id: number;

  @ManyToOne(
    type => Field,
    field => field.id,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'field_id', referencedColumnName: 'id' })
  field_id?: Field;
}
