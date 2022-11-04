import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from '../authentication/AuthenticationModule';
import { OrderDocumentProvider } from '../../contexts/order/infrastructure/mongodb/OrderDocumentProvider';

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
        ...OrderDocumentProvider,
    ]
})
export class OrderModule {
}