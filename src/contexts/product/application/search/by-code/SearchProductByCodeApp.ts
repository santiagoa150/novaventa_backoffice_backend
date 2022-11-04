import { Logger } from '@nestjs/common';
import { UserId } from '../../../../user/domain/UserId';
import { ClientId } from '../../../../client/domain/ClientId';
import { Product } from '../../../domain/Product';
import { IProductRepository } from '../../../domain/IProductRepository';
import { IOptionsApp } from '../../../../shared/domain/interfaces/IOptionsApp';
import { SearchProductValidatorApp } from '../SearchProductValidatorApp';
import { OrderId } from '../../../../order/domain/OrderId';

export class SearchProductByCodeApp {

    private readonly logger: Logger = new Logger(SearchProductByCodeApp.name);

    constructor(
    private readonly repository: IProductRepository
    ) {
    }

    async execute(userId: UserId, clientId: ClientId, orderId: OrderId, code: string, options?: IOptionsApp): Promise<Product> {
        this.logger.log(`[${this.execute.name}] INIT :: userId: ${userId.toString()} clientId: ${clientId.toString()} orderId: ${orderId.toString()} code: ${code}`);
        const product = await this.repository.searchByCode(userId, clientId, orderId, code);
        await SearchProductValidatorApp.validate(product, options);
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return product;
    }
}