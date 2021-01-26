import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassField {
  @PrimaryGeneratedColumn()
  id: number;

}
