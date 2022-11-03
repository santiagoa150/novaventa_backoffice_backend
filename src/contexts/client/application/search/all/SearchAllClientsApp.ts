import { Logger } from '@nestjs/common';
import { UserId } from '../../../../user/domain/UserId';
import { PaginationParamObject } from '../../../../shared/domain/value-object/PaginationParamObject';
import { Client } from '../../../domain/Client';
import { SearchFilterObject } from '../../../../shared/domain/value-object/SearchFilterObject';
import { ClientFilterParam } from '../../../domain/ClientFilterParam';
import { ClientFilterParamConstants } from '../../../domain/ClientFilterParamConstants';
import { EqSearchFilter } from '../../../../shared/domain/value-object/EqSearchFilter';
import { IClientRepository } from '../../../domain/IClientRepository';
import { PaginationResponse } from '../../../../shared/domain/PaginationResponse';

export class SearchAllClientsApp{

    private readonly logger: Logger = new Logger(SearchAllClientsApp.name);

    constructor(
      private readonly repository: IClientRepository,
    ) {
    }
    
    async execute(userId: UserId, page: PaginationParamObject, limit: PaginationParamObject): Promise<PaginationResponse<Client>>{
        this.logger.log(`[${this.execute.name} INIT :: userId: ${userId.toString()}, page: ${page.toString()}, limit: ${limit.toString()}]`);
        const filters: Array<SearchFilterObject> = [];
        const userIdParam = new ClientFilterParam(ClientFilterParamConstants.USER_ID);
        filters.push(new EqSearchFilter(userId.toString(), userIdParam));
        const data = await this.repository.search(filters, page, limit);
        this.logger.log(`[${this.execute.name}] FINISH :: TOTAL: ${data.data.length}`);
        return data;
    }
}