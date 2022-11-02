import { Logger } from '@nestjs/common';
import { Email } from '../../../domain/Email';
import { User } from '../../../domain/User';
import { IUserRepository } from '../../../domain/IUserRepository';
import { IOptionsApp } from '../../../../shared/domain/interfaces/IOptionsApp';
import { HttpErrorMessagesConstants } from '../../../../shared/domain/constants/HttpErrorMessagesConstants';
import { UserFoundException } from '../../../domain/exceptions/UserFoundException';

export class SearchUserByEmailApp {

    private readonly logger: Logger = new Logger(SearchUserByEmailApp.name);

    constructor(
    private readonly repository: IUserRepository
    ) {
    }

    async execute(email: Email, options?: IOptionsApp): Promise<User> {
        this.logger.log(`[${this.execute.name}] INIT :: email: ${email.toString()}`);
        const user = await this.repository.searchByEmail(email);
        if (user && options && options.throwExceptionIfExists){
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.USER_FOUND}`);
            throw new UserFoundException(HttpErrorMessagesConstants.USER_FOUND);
        }
        if (user && options && options.throwExceptionIfNoExists){
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.USER_NOT_FOUND}`);
            throw new UserFoundException(HttpErrorMessagesConstants.USER_NOT_FOUND);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return user;
    }
}