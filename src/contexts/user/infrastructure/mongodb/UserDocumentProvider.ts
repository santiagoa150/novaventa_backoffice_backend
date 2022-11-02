import { NestFactoryProvider } from '../../../shared/infrastructure/nestjs/NestFactoryProvider';
import { MongoDbConstantsProvider } from '../../../shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { Connection } from 'mongoose';
import { MongoDbModelNames } from '../../../shared/infrastructure/mongodb/MongoDbModelNames';
import { UserSchema } from './UserDocument';

export const UserDocumentProvider: Array<NestFactoryProvider> = [{
    provide: MongoDbConstantsProvider.USER_SCHEMA,
    useFactory: (connection: Connection) => {
        return connection.model(MongoDbModelNames.USER, UserSchema);
    },
    inject: [
        MongoDbConstantsProvider.DATABASE_CONNECTION
    ]
}];