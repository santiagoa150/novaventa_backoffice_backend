import { IProductRepository } from '../domain/IProductRepository';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbConstantsProvider } from '../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { ProductDocument } from './ProductDocument';
import { Model } from 'mongoose';

export class MongoProductRepository implements IProductRepository {

    private readonly logger: Logger = new Logger(MongoProductRepository.name);

    constructor(
    @InjectModel(MongoDbConstantsProvider.PRODUCT_SCHEMA) private productModel: Model<ProductDocument>
    ) {
    }

}