import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from '../authentication/AuthenticationModule';
import { OrderDocumentProvider } from '../../contexts/order/infrastructure/mongodb/OrderDocumentProvider';
import { CreateOrderPostController } from './controllers/create/CreateOrderPostController';
import { CreateOrderCommandHandler } from '../../contexts/order/application/create/CreateOrderCommandHandler';
import {
    CreateOrderAppProvider,
    SearchOrderByDateAppProvider,
    SearchOrderByStatusAppProvider
} from './config/OrderProvider';

const commandHandlers = [
    CreateOrderCommandHandler,
];

const queryHandlers = [];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
        AuthenticationModule,
    ],
    controllers: [
        CreateOrderPostController,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...OrderDocumentProvider,
        SearchOrderByStatusAppProvider,
        SearchOrderByDateAppProvider,
        CreateOrderAppProvider,
    ]
})
export class OrderModule {
}