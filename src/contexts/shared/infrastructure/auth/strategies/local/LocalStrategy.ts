import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CommandBus } from '@nestjs/cqrs';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginCommand } from '../../../../../authentication/application/login/LoginCommand';
import { UserDto } from '../../../../../user/domain/UserDto';
import { HttpErrorMessagesConstants } from '../../../../domain/constants/HttpErrorMessagesConstants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private commandBus: CommandBus) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<UserDto> {
        this.logger.log(`[${this.validate.name}] INIT :: ${email}`);
        const user = await this.commandBus.execute(new LoginCommand(email, password));
        if (!user) {
            this.logger.error(`[${this.validate.name}] ERROR :: UNAUTHORIZED`);
            throw new UnauthorizedException(HttpErrorMessagesConstants.UNAUTHORIZED);
        }
        this.logger.log(`[${this.validate.name}] FINISH ::`);
        return user;
    }
}
