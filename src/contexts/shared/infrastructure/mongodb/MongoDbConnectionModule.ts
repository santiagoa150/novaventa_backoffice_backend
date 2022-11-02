import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDbConnectionProvider } from './MongoDbConnectionProvider';

@Module({
    imports: [ConfigModule],
    providers: [...MongoDbConnectionProvider],
    exports: [...MongoDbConnectionProvider],
})
export class MongoDbConnectionModule {
}