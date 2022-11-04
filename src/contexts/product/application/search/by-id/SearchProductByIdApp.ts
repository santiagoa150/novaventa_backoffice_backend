import { Logger } from '@nestjs/common';
import { UserId } from '../../../../user/domain/UserId';
import { ClientId } from '../../../../client/domain/ClientId';
import { ProductId } from '../../../domain/ProductId';
import { IOptionsApp } from '../../../../shared/domain/interfaces/IOptionsApp';
import { Product } from '../../../domain/Product';
import { IProductRepository } from '../../../domain/IProductRepository';
import { SearchProductValidatorApp } from '../SearchProductValidatorApp';
import { OrderId } from '../../../../order/domain/OrderId';

export class SearchProductByIdApp{
  
    private readonly logger: Logger = new Logger(SearchProductByIdApp.name);
    
    constructor(
      private readonly repository: IProductRepository,
    ) {
    }
    
    async exec(userId: UserId, clientId: ClientId, productId: ProductId, orderId: OrderId, options?: IOptionsApp): Promise<Product>{
        this.logger.log(`[${this.exec.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()}`);
        const product = await this.repository.searchById(userId, clientId, orderId, productId);
        await SearchProductValidatorApp.validate(product, options);
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return product;
    }
}