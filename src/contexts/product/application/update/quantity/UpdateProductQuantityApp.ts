import { Logger } from '@nestjs/common';
import { Product } from '../../../domain/Product';
import { UserId } from '../../../../user/domain/UserId';
import { ClientId } from '../../../../client/domain/ClientId';
import { IOptionsApp } from '../../../../shared/domain/interfaces/IOptionsApp';
import { ProductId } from '../../../domain/ProductId';
import { SearchProductByIdApp } from '../../search/by-id/SearchProductByIdApp';
import { IProductRepository } from '../../../domain/IProductRepository';
import { HttpErrorMessagesConstants } from '../../../../shared/domain/constants/HttpErrorMessagesConstants';
import { ProductNotUpdatedException } from '../../../domain/exceptions/ProductNotUpdatedException';

export class UpdateProductQuantityApp {

    private readonly logger: Logger = new Logger(UpdateProductQuantityApp.name);

    constructor(
    private readonly searchProductByIdApp: SearchProductByIdApp,
    private readonly repository: IProductRepository,
    ) {
    }

    async execute(userId: UserId, clientId: ClientId, productId: ProductId, quantity: number, productParam?: Product, options?: IOptionsApp): Promise<Product> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()} quantity: ${quantity}`);
        const product = productParam ? productParam : await this.searchProductByIdApp.exec(userId, clientId, productId);
        const newTemplate = product.toPrimitives();
        newTemplate.quantity = quantity;
        const newProduct = await this.repository.update(newTemplate);
        if (!newProduct && options && options.throwExceptionIfCantUpdate){
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.PRODUCT_NOT_UPDATED}`);
            throw new ProductNotUpdatedException(HttpErrorMessagesConstants.PRODUCT_NOT_UPDATED);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return product;
    }
}