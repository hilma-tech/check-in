import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { IsDanielGuard } from './is-daniel.guard';

export const IsDaniel = () => applyDecorators(UseGuards(IsDanielGuard))
