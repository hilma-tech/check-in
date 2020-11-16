import { User } from '@hilma/auth-nest';
import { Entity, Column, ChildEntity } from 'typeorm';

@ChildEntity()
export class SuperAdmin extends User {
}