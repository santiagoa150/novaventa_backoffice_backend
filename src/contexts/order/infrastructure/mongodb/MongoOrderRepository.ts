import { IOrderRepository } from '../../domain/IOrderRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Model } from 'mongoose';
import { OrderDocument } from './OrderDocument';
import { OrderDto } from '../../domain/OrderDto';
import { Order } from '../../domain/Order';
import { UserId } from '../../../user/domain/UserId';
import { OrderStatus } from '../../domain/OrderStatus';

export class MongoOrderRepository implements IOrderRepository {

    private readonly logger: Logger = new Logger(MongoOrderRepository.name);

    constructor(
    @InjectModel(MongoDbConstantsProvider.ORDER_SCHEMA) private orderModel: Model<OrderDocument>
    ) {
    }

    async create(order: OrderDto): Promise<Order> {
        this.logger.log(`[${this.create.name}] INIT :: order: ${JSON.stringify(order, null, 2)}`);
        const model = new this.orderModel(order);
        await model.save();
        const orderMapped = model ? Order.fromPrimitives(model) : null;
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return orderMapped;
    }

    async searchByStatus(userId: UserId, status: OrderStatus): Promise<Order> {
        this.logger.log(`[${this.searchByStatus.name}] INIT :: userId: ${userId.toString()} status: ${status.toString()}`);
        const orderFound = await this.orderModel.findOne({status: status.toString(), userId: userId.toString()});
        const orderMapped = orderFound ? Order.fromPrimitives(orderFound) : null;
        this.logger.log(`[${this.searchByStatus.name}] FINISH ::`);
        return orderMapped;
    }

    async searchByDate(userId: UserId, year: number, campaign: number): Promise<Order> {
        this.logger.log(`[${this.searchByStatus.name}] INIT :: userId: ${userId.toString()} year: ${year} campaign: ${campaign}`);
        const orderFound = await this.orderModel.findOne({
            year: year,
            campaign: campaign,
            userId: userId.toString()
        });
        const orderMapped = orderFound ? Order.fromPrimitives(orderFound) : null;
        this.logger.log(`[${this.searchByStatus.name}] FINISH ::`);
        return orderMapped;    }
}