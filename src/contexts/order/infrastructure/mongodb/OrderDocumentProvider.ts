import { NestFactoryProvider } from '../../../shared/infrastructure/nestjs/NestFactoryProvider';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Connection } from 'mongoose';
import { MongoDbModelNames } from '../../../shared/infrastructure/mongodb/MongoDbModelNames';
import { OrderSchema } from './OrderDocument';

export const OrderDocumentProvider: Array<NestFactoryProvider> = [{
    provide: MongoDbConstantsProvider.ORDER_SCHEMA,
    useFactory: (connection: Connection) => {
        return connection.model(MongoDbModelNames.ORDER, OrderSchema);
    },
    inject: [
        MongoDbConstantsProvider.DATABASE_CONNECTION,
    ]
}];