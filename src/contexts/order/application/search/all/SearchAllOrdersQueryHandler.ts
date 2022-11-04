import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchAllOrdersQuery } from './SearchAllOrdersQuery';
import { Logger } from '@nestjs/common';
import { PaginationResponse } from '../../../../shared/domain/PaginationResponse';
import { OrderDto } from '../../../domain/OrderDto';
import { SearchAllOrdersApp } from './SearchAllOrdersApp';
import { UserId } from '../../../../user/domain/UserId';
import { PaginationParamObject } from '../../../../shared/domain/value-object/PaginationParamObject';

@QueryHandler(SearchAllOrdersQuery)
export class SearchAllOrdersQueryHandler implements IQueryHandler<SearchAllOrdersQuery> {
  
    private readonly logger: Logger = new Logger(SearchAllOrdersQueryHandler.name);
    
    constructor(
      private readonly searchAllOrdersApp: SearchAllOrdersApp,
    ) {
    }
    
    async execute(query: SearchAllOrdersQuery): Promise<PaginationResponse<OrderDto>> {
        this.logger.log(`[${this.execute.name}] INIT :: query: ${JSON.stringify(query, null, 2)}`);
        const result = await this.searchAllOrdersApp.execute(
            new UserId(query.userId),
            new PaginationParamObject(String(query.page)),
            new PaginationParamObject(String(query.limit)),
        );
        const response = { data: result.data.map(d => d.toPrimitives()), metadata: result.metadata };
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}