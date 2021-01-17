import { User } from '@hilma/auth-nest';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class SuperAdmin extends User {}
