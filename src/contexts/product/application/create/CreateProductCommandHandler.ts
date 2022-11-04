import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './CreateProductCommand';
import { Logger } from '@nestjs/common';
import { CreateProductApp } from './CreateProductApp';
import { ProductDto } from '../../domain/ProductDto';
import { UserId } from '../../../user/domain/UserId';
import { ClientId } from '../../../client/domain/ClientId';
import { SearchProductByCodeApp } from '../search/by-code/SearchProductByCodeApp';
import { UpdateProductQuantityApp } from '../update/quantity/UpdateProductQuantityApp';
import { OrderId } from '../../../order/domain/OrderId';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand> {

    private readonly logger: Logger = new Logger(CreateProductCommandHandler.name);

    constructor(
    private readonly searchProductByCodeApp: SearchProductByCodeApp,
    private readonly createProductApp: CreateProductApp,
    private readonly updateProductQuantityApp: UpdateProductQuantityApp
    ) {
    }

    async execute(command: CreateProductCommand): Promise<ProductDto> {
        this.logger.log(`[${this.execute.name}] INIT :: command: ${JSON.stringify(command, null, 2)}`);
        const { code, quantity } = command;
        const userId = new UserId(command.userId);
        const clientId = new ClientId(command.clientId);
        const orderId = new OrderId(command.orderId);
        const product = await this.searchProductByCodeApp.execute(userId, clientId, orderId, code);
        if (!product) {
            const newProduct = await this.createProductApp.execute(
                userId,
                clientId,
                orderId,
                command.name,
                command.catalogPrice,
                command.listPrice,
                quantity,
                code,
                command.imageUrl
            );
            this.logger.log(`[${this.execute.name}] FINISH CREATING PRODUCT ::`);
            return newProduct.toPrimitives();
        } else {
            const updatedProduct = await this.updateProductQuantityApp.execute(
                userId,
                clientId,
                product.productId,
                orderId,
                product.quantity + quantity,
                product,
                {throwExceptionIfCantUpdate: true},
            );
            this.logger.log(`[${this.execute.name}] FINISH UPDATING PRODUCT ::`);
            return updatedProduct.toPrimitives();
        }
    }

}