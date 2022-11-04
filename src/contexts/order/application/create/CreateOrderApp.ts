import { Logger } from '@nestjs/common';
import { UserId } from '../../../user/domain/UserId';
import { Order } from '../../domain/Order';
import { OrderDto } from '../../domain/OrderDto';
import { OrderId } from '../../domain/OrderId';
import { OrderStatusConstants } from '../../domain/OrderStatusConstants';
import { IOrderRepository } from '../../domain/IOrderRepository';
import { IOptionsApp } from '../../../shared/domain/interfaces/IOptionsApp';
import { HttpErrorMessagesConstants } from '../../../shared/domain/constants/HttpErrorMessagesConstants';
import { OrderNotCreatedException } from '../../domain/exception/OrderNotCreatedException';
import { SearchOrderByStatusApp } from '../search/by-status/SearchOrderByStatusApp';
import { OrderStatus } from '../../domain/OrderStatus';
import { SearchOrderByDateApp } from '../search/by-date/SearchOrderByDateApp';

export class CreateOrderApp{
  
    private readonly logger: Logger = new Logger(CreateOrderApp.name);
    
    constructor(
      private readonly searchOrderByStatusApp: SearchOrderByStatusApp,
      private readonly searchOrderByDateApp: SearchOrderByDateApp,
      private readonly repository: IOrderRepository,
    ) {
    }
    
    async execute(userId: UserId, year: number, campaign: number, options?: IOptionsApp): Promise<Order>{
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} year: ${year} campaign: ${campaign}`);
        await this.searchOrderByStatusApp.execute(userId, new OrderStatus(OrderStatusConstants.PENDING), {throwExceptionIfExists: true});
        await this.searchOrderByDateApp.execute(userId, year, campaign, {throwExceptionIfExists: true});
        const template = await this.mapOrder(userId, year, campaign);
        const order = await this.repository.create(template);
        if(!order && options && options.throwExceptionIfCantCreate){
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.ORDER_NOT_CREATED}`);
            throw new OrderNotCreatedException(HttpErrorMessagesConstants.ORDER_NOT_CREATED);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return order;
    }
    
    async mapOrder(userId: UserId, year: number, campaign: number): Promise<OrderDto>{
        this.logger.log(`[${this.mapOrder.name}] INIT :: userId: ${userId.toString()} year: ${year} campaign: ${campaign}`);
        const order: OrderDto = {
            campaign: campaign,
            createdAt: new Date(),
            orderId: OrderId.generate().toString(),
            status: OrderStatusConstants.PENDING,
            totalProducts: 0,
            userId: userId.toString(),
            year: year,
        };
        this.logger.log(`[${this.mapOrder.name}] FINISH :: order: ${JSON.stringify(order, null, 2)}`);
        return order;
    }
}