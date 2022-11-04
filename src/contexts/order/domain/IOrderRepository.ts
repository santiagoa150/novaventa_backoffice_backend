import { OrderDto } from './OrderDto';
import { Order } from './Order';
import { OrderStatus } from './OrderStatus';
import { UserId } from '../../user/domain/UserId';
import { SearchFilterObject } from '../../shared/domain/value-object/SearchFilterObject';
import { PaginationParamObject } from '../../shared/domain/value-object/PaginationParamObject';
import { PaginationResponse } from '../../shared/domain/PaginationResponse';

export interface IOrderRepository {
  create(order: OrderDto): Promise<Order>;

  search(filters?: Array<SearchFilterObject>, page?: PaginationParamObject, limit?: PaginationParamObject): Promise<PaginationResponse<Order>>;

  searchByStatus(userId: UserId, status: OrderStatus): Promise<Order>;

  searchByDate(userId: UserId, year: number, campaign: number): Promise<Order>;
}