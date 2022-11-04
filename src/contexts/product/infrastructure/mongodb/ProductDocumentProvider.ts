import { NestFactoryProvider } from '../../../shared/infrastructure/nestjs/NestFactoryProvider';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Connection } from 'mongoose';
import { MongoDbModelNames } from '../../../shared/infrastructure/mongodb/MongoDbModelNames';
import { ProductSchema } from './ProductDocument';

export const ProductDocumentProvider: Array<NestFactoryProvider> = [{
    provide: MongoDbConstantsProvider.PRODUCT_SCHEMA,
    useFactory: (connection: Connection) => {
        return connection.model(MongoDbModelNames.PRODUCT, ProductSchema);
    },
    inject: [
        MongoDbConstantsProvider.DATABASE_CONNECTION
    ]
}];