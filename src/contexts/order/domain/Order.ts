import { DomainRoot } from '../../shared/domain/DomainRoot';
import { OrderId } from './OrderId';
import { OrderStatus } from './OrderStatus';
import { OrderDto } from './OrderDto';
import { UserId } from '../../user/domain/UserId';

export class Order implements DomainRoot {

    private readonly orderId: OrderId;
    private readonly userId: UserId;
    private readonly status: OrderStatus;
    private readonly year: number;
    private readonly totalProducts: number;
    private readonly createdAt: Date;
    private readonly campaign: number;

    constructor(orderId: OrderId, userId: UserId, status: OrderStatus, year: number, totalProducts: number, createdAt: Date, campaign: number) {
        this.orderId = orderId;
        this.userId = userId;
        this.status = status;
        this.year = year;
        this.totalProducts = totalProducts;
        this.createdAt = createdAt;
        this.campaign = campaign;
    }

    toPrimitives(): OrderDto {
        return {
            orderId: this.orderId.toString(),
            userId: this.userId.toString(),
            status: this.status.toString(),
            year: this.year,
            totalProducts: this.totalProducts,
            createdAt: this.createdAt,
            campaign: this.campaign
        };
    }

    static fromPrimitives(order: OrderDto): Order {
        return new Order(
            new OrderId(order.orderId),
            new UserId(order.userId),
            new OrderStatus(order.status),
            order.year,
            order.totalProducts,
            new Date(order.createdAt),
            order.campaign,
        );
    }
}