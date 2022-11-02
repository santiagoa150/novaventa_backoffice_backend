import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserDecorator {
  userId: string;
  email: string;
  name: string;
  active: boolean;
}

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IUserDecorator => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
