import { Logger } from '@nestjs/common';
import { OrderStatus } from '../../../domain/OrderStatus';
import { Order } from '../../../domain/Order';
import { IOptionsApp } from '../../../../shared/domain/interfaces/IOptionsApp';
import { IOrderRepository } from '../../../domain/IOrderRepository';
import { UserId } from '../../../../user/domain/UserId';
import { SearchOrderValidatorApp } from '../SearchOrderValidatorApp';

export class SearchOrderByStatusApp {

    private readonly logger: Logger = new Logger(SearchOrderByStatusApp.name);

    constructor(
    private readonly repository: IOrderRepository
    ) {
    }

    async execute(userId: UserId, status: OrderStatus, options?: IOptionsApp): Promise<Order> {
        this.logger.log(`[${this.execute.name}] INIT :: status: ${status.toString()}`);
        const order: Order = await this.repository.searchByStatus(userId, status);
        await SearchOrderValidatorApp.validate(order, options);
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return order;
    }
}