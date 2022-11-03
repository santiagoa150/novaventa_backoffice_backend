import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchAllClientsQuery } from './SearchAllClientsQuery';
import { Logger } from '@nestjs/common';
import { ClientDto } from '../../../domain/ClientDto';
import { SearchAllClientsApp } from './SearchAllClientsApp';
import { UserId } from '../../../../user/domain/UserId';
import { PaginationParamObject } from '../../../../shared/domain/value-object/PaginationParamObject';
import { PaginationResponse } from '../../../../shared/domain/PaginationResponse';

@QueryHandler(SearchAllClientsQuery)
export class SearchAllClientsQueryHandler implements IQueryHandler<SearchAllClientsQuery> {

    private readonly logger: Logger = new Logger(SearchAllClientsQueryHandler.name);

    constructor(
    private readonly searchAllClientsApp: SearchAllClientsApp
    ) {
    }

    async execute(query: SearchAllClientsQuery): Promise<PaginationResponse<ClientDto>> {
        this.logger.log(`[${this.execute.name}] INIT :: query: ${JSON.stringify(query, null, 2)}`);
        const clients = await this.searchAllClientsApp.execute(
            new UserId(query.userId),
            new PaginationParamObject(String(query.page)),
            new PaginationParamObject(String(query.limit))
        );
        const response = {data: clients.data.map(c => c.toPrimitives()), metadata: clients.metadata};
        this.logger.log(`[${this.execute.name}] INIT ::`);
        return response;
    }

}