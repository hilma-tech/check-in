import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsDanielGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
    ){
    const request = context.switchToHttp().getRequest();
    if(request.headers.origin === "https://danielsoloway.com"){
      return true
    } else {
      return false
    }
  }
}
