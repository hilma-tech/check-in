import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsDefined, IsString, Length, Matches } from 'class-validator';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Classroom } from 'src/classroom/classroom.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[A-Za-z\u0590-\u05EA0-9"'-]/)
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @IsDefined()
  @IsString()
  @Length(1, 30)
  @Matches(/[A-Za-z\u0590-\u05EA"'-]/)
  @Column({ type: 'varchar', length: 30 })
  city: string;

  @OneToMany(
    () => Classroom,
    classroom => classroom.school_id,
    { onDelete: 'CASCADE' }
  )
  classrooms: Classroom[];

  @OneToMany(
    () => Student,
    student => student.school,
    { onDelete: 'CASCADE' }
  )
  students: Student[];

  @OneToMany(
    () => Teacher,
    teacher => teacher.school,
    { onDelete: 'CASCADE' }
  )
  teachers: Teacher[];
}
