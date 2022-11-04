import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from '../authentication/AuthenticationModule';
import { ProductDocumentProvider } from '../../contexts/product/mongodb/ProductDocumentProvider';

const commandHandlers = [];

const queryHandlers = [];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
        AuthenticationModule,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...ProductDocumentProvider,
    ]
})
export class ProductModule{
}