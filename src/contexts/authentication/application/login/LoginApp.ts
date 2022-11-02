import { Email } from '../../../user/domain/Email';
import { Password } from '../../../user/domain/Password';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '../../../user/domain/User';
import { SearchUserByEmailApp } from '../../../user/application/search/by-email/SearchUserByEmailApp';
import { HttpErrorMessagesConstants } from '../../../shared/domain/constants/HttpErrorMessagesConstants';
import { CryptoUtils } from '../../../shared/application/utils/CryptoUtils';
import { InactiveUserException } from '../../domain/exceptions/InactiveUserException';
import { UserDto } from '../../../user/domain/UserDto';
import { IJwt } from '../../../shared/infrastructure/auth/IJwt';
import { LoginAppResponse } from './LoginAppResponse';

export class LoginApp {

    private readonly logger: Logger = new Logger(LoginApp.name);
    
    constructor(
      private readonly searchUserByEmail: SearchUserByEmailApp,
      private readonly jwt: IJwt,
    ) {
    }
    
    async execute(email: Email, password: Password): Promise<User> {
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const user = await this.searchUserByEmail.execute(email);
        if (!user) {
            this.logger.error(`[${this.execute.name}] :: ERROR: ${HttpErrorMessagesConstants.USER_NOT_FOUND}`);
            throw new UnauthorizedException(HttpErrorMessagesConstants.UNAUTHORIZED);
        }
        const userPrimitives = user.toPrimitives();
        if (userPrimitives.password !== CryptoUtils.hash(password.toString())) {
            this.logger.error(`[${this.execute.name}] :: INCORRECT PASSWORD`);
            return null;
        }
        if (!userPrimitives.active) {
            this.logger.error(`[${this.execute.name}] :: ERROR: ${HttpErrorMessagesConstants.INACTIVE_USER}`);
            throw new InactiveUserException(HttpErrorMessagesConstants.INACTIVE_USER);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return user;
    }

    login(data: UserDto): LoginAppResponse {
        this.logger.log(`[${this.execute.name}] LOGIN INIT ::`);
        const payload = {
            userId: data.userId,
            email: data.email,
            name: data.name,
            active: data.active,
        };
        this.logger.log(`[${this.execute.name}] LOGIN FINISH :: payload: ${JSON.stringify(payload)}`);
        console.log(this.jwt);
        return {accessToken: this.jwt.sign(payload)};
    }
}