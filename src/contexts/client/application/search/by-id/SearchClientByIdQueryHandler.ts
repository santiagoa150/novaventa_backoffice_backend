import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchClientByIdQuery } from './SearchClientByIdQuery';
import { Logger } from '@nestjs/common';
import { ClientDto } from '../../../domain/ClientDto';
import { SearchClientByIdApp } from './SearchClientByIdApp';
import { UserId } from '../../../../user/domain/UserId';
import { ClientId } from '../../../domain/ClientId';

@QueryHandler(SearchClientByIdQuery)
export class SearchClientByIdQueryHandler implements IQueryHandler<SearchClientByIdQuery>{
  
    private readonly logger: Logger = new Logger(SearchClientByIdQueryHandler.name);
    
    constructor(
      private readonly searchClientByIdApp: SearchClientByIdApp,
    ) {
    }
    
    async execute(query: SearchClientByIdQuery): Promise<ClientDto> {
        this.logger.log(`[${this.execute.name}] INIT :: query: ${JSON.stringify(query, null, 2)}`);
        const client = await this.searchClientByIdApp.execute(
            new UserId(query.userId),
            new ClientId(query.clientId),
            {throwExceptionIfNoExists: true},
        );
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return client.toPrimitives();
    }
}