import { ProductDto } from './ProductDto';
import { Product } from './Product';
import { UserId } from '../../user/domain/UserId';
import { ClientId } from '../../client/domain/ClientId';
import { ProductId } from './ProductId';

export interface IProductRepository {

  create(product: ProductDto): Promise<Product>;

  update(product: ProductDto): Promise<Product>;
  
  searchById(userId: UserId, clientId: ClientId, productId: ProductId): Promise<Product>;

  searchByCode(userId: UserId, clientId: ClientId, code: string): Promise<Product>;
}