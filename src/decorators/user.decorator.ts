import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../auth/strategies/jwt-payload.type';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): JwtPayload | keyof JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
