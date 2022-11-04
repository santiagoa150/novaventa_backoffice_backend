import { ProductDto } from './ProductDto';
import { Product } from './Product';
import { UserId } from '../../user/domain/UserId';
import { ClientId } from '../../client/domain/ClientId';
import { ProductId } from './ProductId';
import { OrderId } from '../../order/domain/OrderId';

export interface IProductRepository {

  create(product: ProductDto): Promise<Product>;

  update(product: ProductDto): Promise<Product>;
  
  searchById(userId: UserId, clientId: ClientId, orderId: OrderId, productId: ProductId): Promise<Product>;

  searchByCode(userId: UserId, clientId: ClientId, orderId: OrderId, code: string): Promise<Product>;
}