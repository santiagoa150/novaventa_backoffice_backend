import { Logger } from '@nestjs/common';
import { UserId } from '../../../../user/domain/UserId';
import { PaginationParamObject } from '../../../../shared/domain/value-object/PaginationParamObject';
import { PaginationResponse } from '../../../../shared/domain/PaginationResponse';
import { SearchFilterObject } from '../../../../shared/domain/value-object/SearchFilterObject';
import { EqSearchFilter } from '../../../../shared/domain/value-object/EqSearchFilter';
import { Order } from '../../../domain/Order';
import { IOrderRepository } from '../../../domain/IOrderRepository';
import { OrderFilterParam } from '../../../domain/OrderFilterParam';
import { OrderFilterParamConstants } from '../../../domain/OrderFilterParamConstants';

export class SearchAllOrdersApp {

    private readonly logger: Logger = new Logger(SearchAllOrdersApp.name);

    constructor(
    private readonly repository: IOrderRepository
    ) {
    }

    async execute(userId: UserId, page: PaginationParamObject, limit: PaginationParamObject): Promise<PaginationResponse<Order>> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()}, page: ${page.toString()}, limit: ${limit.toString()}`);
        const filters: Array<SearchFilterObject> = [];
        const userIdParam = new OrderFilterParam(OrderFilterParamConstants.USER_ID);
        filters.push(new EqSearchFilter(userId.toString(), userIdParam));
        const data = await this.repository.search(filters, page, limit);
        this.logger.log(`[${this.execute.name}] FINISH :: TOTAL: ${data.data.length}`);
        return data;
    }
}