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
import { OrderId } from '../../../order/domain/OrderId';
import { SearchOrderByStatusApp } from '../../../order/application/search/by-status/SearchOrderByStatusApp';
import { OrderStatus } from '../../../order/domain/OrderStatus';
import { OrderStatusConstants } from '../../../order/domain/OrderStatusConstants';
import { InvalidOrderIdException } from '../../../order/domain/exception/InvalidOrderIdException';

export class CreateProductApp {

    private readonly logger: Logger = new Logger(CreateProductApp.name);

    constructor(
    private readonly searchClientByIdApp: SearchClientByIdApp,
    private readonly searchOrderByStatusApp: SearchOrderByStatusApp,
    private readonly repository: IProductRepository
    ) {
    }

    async execute(userId: UserId, clientId: ClientId, orderId: OrderId, name: string, catalogPrice: number, listPrice: number, quantity: number, code: string,
        imageUrl: string, options?: IOptionsApp): Promise<Product> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()} code: ${code} quantity: ${quantity}`);
        await this.searchClientByIdApp.execute(userId, clientId, { throwExceptionIfNoExists: true });
        const order = (await this.searchOrderByStatusApp.execute(userId, new OrderStatus(OrderStatusConstants.PENDING), {throwExceptionIfNoExists: true})).toPrimitives();
        if (order.orderId !== orderId.toString()){
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.INVALID_ORDER_ID}`);
            throw new InvalidOrderIdException(HttpErrorMessagesConstants.INVALID_ORDER_ID);
        }
        const template = await this.mapProduct(userId, clientId, orderId, name, catalogPrice, listPrice, quantity, code, imageUrl);
        const product = await this.repository.create(template);
        if (!product && options && options.throwExceptionIfCantCreate) {
            this.logger.error(`[${this.execute.name}] ERROR :: ${HttpErrorMessagesConstants.PRODUCT_NOT_CREATED}`);
            throw new ProductNotCreatedException(HttpErrorMessagesConstants.PRODUCT_NOT_CREATED);
        }
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return product;
    }

    async mapProduct(userId: UserId, clientId: ClientId, orderId: OrderId, name: string, catalogPrice: number, listPrice: number, quantity: number, code: string,
        imageUrl: string): Promise<ProductDto> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()} code: ${code}`);
        const product: ProductDto = {
            catalogPrice: catalogPrice,
            clientId: clientId.toString(),
            orderId: orderId.toString(),
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