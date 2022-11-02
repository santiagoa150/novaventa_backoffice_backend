import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './strategies/jwt/JwtAuthGuard';

export function Auth() {
    return applyDecorators(
        UseGuards(JwtAuthGuard)
    );
}
