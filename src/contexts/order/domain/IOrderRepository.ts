import { OrderDto } from './OrderDto';
import { Order } from './Order';
import { OrderStatus } from './OrderStatus';
import { UserId } from '../../user/domain/UserId';

export interface IOrderRepository{
  create(order: OrderDto): Promise<Order>;
  
  searchByStatus(userId: UserId, status: OrderStatus): Promise<Order>;

  searchByDate(userId: UserId, year: number, campaign: number): Promise<Order>;
}