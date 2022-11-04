import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from '../authentication/AuthenticationModule';
import { OrderDocumentProvider } from '../../contexts/order/infrastructure/mongodb/OrderDocumentProvider';
import { CreateOrderPostController } from './controllers/create/CreateOrderPostController';
import { CreateOrderCommandHandler } from '../../contexts/order/application/create/CreateOrderCommandHandler';
import {
    CreateOrderAppProvider, SearchAllOrdersAppProvider,
    SearchOrderByDateAppProvider,
    SearchOrderByStatusAppProvider
} from './config/OrderProvider';
import { SearchAllOrdersGetController } from './controllers/search/all/SearchAllOrdersGetController';
import { SearchAllOrdersQueryHandler } from '../../contexts/order/application/search/all/SearchAllOrdersQueryHandler';

const commandHandlers = [
    CreateOrderCommandHandler,
];

const queryHandlers = [
    SearchAllOrdersQueryHandler,
];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
        AuthenticationModule,
    ],
    controllers: [
        CreateOrderPostController,
        SearchAllOrdersGetController,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...OrderDocumentProvider,
        SearchOrderByStatusAppProvider,
        SearchOrderByDateAppProvider,
        SearchAllOrdersAppProvider,
        CreateOrderAppProvider,
    ]
})
export class OrderModule {
}