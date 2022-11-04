import { IProductRepository } from '../../domain/IProductRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { ProductDocument } from './ProductDocument';
import { Model } from 'mongoose';
import { ProductDto } from '../../domain/ProductDto';
import { Product } from '../../domain/Product';
import { UserId } from '../../../user/domain/UserId';
import { ClientId } from '../../../client/domain/ClientId';
import { ProductId } from '../../domain/ProductId';
import { OrderId } from '../../../order/domain/OrderId';

export class MongoProductRepository implements IProductRepository {

    private readonly logger: Logger = new Logger(MongoProductRepository.name);

    constructor(
    @InjectModel(MongoDbConstantsProvider.PRODUCT_SCHEMA) private productModel: Model<ProductDocument>
    ) {
    }


    async create(product: ProductDto): Promise<Product> {
        this.logger.log(`[${this.create.name}] INIT :: product: ${JSON.stringify(product, null, 2)}`);
        const model = new this.productModel(product);
        await model.save();
        const productMapped = model ? Product.fromPrimitives(model) : null;
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return productMapped;
    }

    async update(product: ProductDto): Promise<Product> {
        this.logger.log(`[${this.update.name}] INIT :: product: ${JSON.stringify(product, null, 2)}`);
        const productUpdated = await this.productModel.findOneAndUpdate({
            userId: product.userId.toString(),
            clientId: product.clientId.toString(),
            productId: product.productId.toString()
        }, product, { new: true });
        const productMapped = productUpdated ? Product.fromPrimitives(productUpdated) : null;
        this.logger.log(`[${this.update.name}] FINISH ::`);
        return productMapped;
    }

    async searchByCode(userId: UserId, clientId: ClientId, orderId: OrderId, code: string): Promise<Product> {
        this.logger.log(`[${this.searchByCode.name}] INIT :: userId: ${userId.toString()}, clientId: ${clientId.toString()}`);
        const productFound = await this.productModel.findOne({
            userId: userId.toString(),
            clientId: clientId.toString(),
            orderId: orderId.toString(),
            code: code
        });
        const productMapped = productFound ? Product.fromPrimitives(productFound) : null;
        this.logger.log(`[${this.searchByCode.name}] FINISH ::`);
        return productMapped;
    }

    async searchById(userId: UserId, clientId: ClientId, orderId: OrderId, productId: ProductId): Promise<Product> {
        this.logger.log(`[${this.searchByCode.name}] INIT :: userId: ${userId.toString()}, clientId: ${clientId.toString()}, productId: ${productId.toString()}`);
        const productFound = await this.productModel.findOne({
            userId: userId.toString(),
            clientId: clientId.toString(),
            productId: productId.toString(),
            orderId: orderId.toString(),
        });
        const productMapped = productFound ? Product.fromPrimitives(productFound) : null;
        this.logger.log(`[${this.searchByCode.name}] FINISH ::`);
        return productMapped;
    }
}