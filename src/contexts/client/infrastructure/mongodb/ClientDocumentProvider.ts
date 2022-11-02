import { NestFactoryProvider } from '../../../shared/infrastructure/nestjs/NestFactoryProvider';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Connection } from 'mongoose';
import { MongoDbModelNames } from '../../../shared/infrastructure/mongodb/MongoDbModelNames';
import { ClientSchema } from './ClientDocument';

export const ClientDocumentProvider: Array<NestFactoryProvider> = [{
    provide: MongoDbConstantsProvider.CLIENT_SCHEMA,
    useFactory: (connection: Connection) => {
        return connection.model(MongoDbModelNames.CLIENT, ClientSchema);
    },
    inject: [
        MongoDbConstantsProvider.DATABASE_CONNECTION,
    ]
}];