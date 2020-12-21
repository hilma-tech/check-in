import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
//   @ManyToOne(type => School, school => school.id)
  school: number;
}
