import { MongoDbConstantsProvider } from './MongoDbConstantsProvider';
import { ConfigModule } from '@nestjs/config';
import { NestFactoryProvider } from '../nestjs/NestFactoryProvider';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';

export const MongoDbConnectionProvider: Array<NestFactoryProvider> = [{
    imports: [ConfigModule],
    provide: MongoDbConstantsProvider.DATABASE_CONNECTION,
    useFactory: async (): Promise<Connection> => {
        return mongoose.createConnection(process.env.MONGODB_CONNECTION_URI);
    }
}];