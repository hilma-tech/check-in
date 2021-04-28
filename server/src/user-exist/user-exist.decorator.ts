import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserExistGuard } from './user-exist.guard';

export const UserExist = () => applyDecorators(UseGuards(UserExistGuard))
