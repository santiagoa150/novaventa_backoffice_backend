import { Logger } from '@nestjs/common';
import { UserId } from '../../../user/domain/UserId';
import { ClientId } from '../../../client/domain/ClientId';
import { Product } from '../../domain/Product';
import { ProductDto } from '../../domain/ProductDto';
import { ProductId } from '../../domain/ProductId';
import { SearchClientByIdApp } from '../../../client/application/search/by-id/SearchClientByIdApp';
import { IProductRepository } from '../../domain/IProductRepository';
import { IOptionsApp } from '../../../shared/domain/interfaces/IOptionsApp';
import { ProductNotCreatedException } from '../../domain/exceptions/ProductNotCreatedException';
import { HttpErrorMessagesConstants } from '../../../shared/domain/constants/HttpErrorMessagesConstants';

export class CreateProductApp {

    private readonly logger: Logger = new Logger(CreateProductApp.name);

    constructor(
    private readonly searchClientByIdApp: SearchClientByIdApp,
    private readonly repository: IProductRepository
    ) {
    }

    async execute(userId: UserId, clientId: ClientId, name: string, catalogPrice: number, listPrice: number, quantity: number, code: string,
        imageUrl: string, options?: IOptionsApp): Promise<Product> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()} code: ${code} quantity: ${quantity}`);
        await this.searchClientByIdApp.execute(userId, clientId, { throwExceptionIfNoExists: true });
        const template = await this.mapProduct(userId, clientId, name, catalogPrice, listPrice, quantity, code, imageUrl);
        const product = await this.repository.create(template);
        if(!product && options && options.throwExceptionIfCantCreate){
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.PRODUCT_NOT_CREATED}`);
            throw new ProductNotCreatedException(HttpErrorMessagesConstants.PRODUCT_NOT_CREATED);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return product;
    }

    async mapProduct(userId: UserId, clientId: ClientId, name: string, catalogPrice: number, listPrice: number, quantity: number, code: string,
        imageUrl: string): Promise<ProductDto> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()} code: ${code}`);
        const product: ProductDto = {
            catalogPrice: catalogPrice,
            clientId: clientId.toString(),
            code: code,
            imageUrl: imageUrl,
            listPrice: listPrice,
            name: name,
            productId: ProductId.generate().toString(),
            quantity: quantity,
            userId: userId.toString()
        };
        this.logger.log(`[${this.execute.name}] FINISH :: product: ${JSON.stringify(product, null, 2)}`);
        return product;
    }
}