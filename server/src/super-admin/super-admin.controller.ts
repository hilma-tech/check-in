import { UserService, UseLocalAuth, RequestUser, UserModule, User, Role } from '@hilma/auth-nest';
import { Controller, Post, Res } from '@nestjs/common';
import { SuperAdmin } from './super-admin.entity';


@Controller('super-admin')
export class SuperAdminController {

    constructor(private readonly userService: UserService) {}

    @Post('/newUser')
    register(username, password) {
            let user: Partial<SuperAdmin> = new SuperAdmin({ username, password });
            let userRole = new Role();
            userRole.id = 0; //you just the role id. 
            user.roles = [userRole];
    
            this.userService.createUser<User>(user);
        } 
  } 


