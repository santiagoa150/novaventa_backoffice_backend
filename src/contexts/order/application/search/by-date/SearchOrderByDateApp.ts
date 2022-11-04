import { Logger } from '@nestjs/common';
import { UserId } from '../../../../user/domain/UserId';
import { IOptionsApp } from '../../../../shared/domain/interfaces/IOptionsApp';
import { Order } from '../../../domain/Order';
import { IOrderRepository } from '../../../domain/IOrderRepository';
import { SearchOrderValidatorApp } from '../SearchOrderValidatorApp';

export class SearchOrderByDateApp {

    private readonly logger: Logger = new Logger(SearchOrderByDateApp.name);

    constructor(
    private readonly repository: IOrderRepository
    ) {
    }

    async execute(userId: UserId, year: number, campaign: number, options?: IOptionsApp): Promise<Order> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} year: ${year} campaign: ${campaign}`);
        const order: Order = await this.repository.searchByDate(userId, year, campaign);
        await SearchOrderValidatorApp.validate(order, options);
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return order;
    }
}