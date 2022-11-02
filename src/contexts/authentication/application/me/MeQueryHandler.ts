import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MeQuery } from './MeQuery';
import { Logger } from '@nestjs/common';
import { SearchUserByEmailApp } from '../../../user/application/search/by-email/SearchUserByEmailApp';
import { UserDto } from '../../../user/domain/UserDto';
import { Email } from '../../../user/domain/Email';

@QueryHandler(MeQuery)
export class MeQueryHandler implements IQueryHandler<MeQuery> {

    private readonly logger: Logger = new Logger(MeQueryHandler.name);

    constructor(private readonly searchUserByEmailApp: SearchUserByEmailApp) {
    }

    async execute(query: MeQuery): Promise<Omit<UserDto, 'password'>> {
        this.logger.log(`[${this.execute.name}] INIT :: query: ${JSON.stringify(query)}`);
        const user = await this.searchUserByEmailApp.execute(
            new Email(query.email),
            { throwExceptionIfNoExists: true }
        );
        const { password, ...response } = user.toPrimitives();
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}