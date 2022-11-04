import { NestFactoryProvider } from '../../../contexts/shared/infrastructure/nestjs/NestFactoryProvider';
import { CreateOrderApp } from '../../../contexts/order/application/create/CreateOrderApp';
import { MongoOrderRepository } from '../../../contexts/order/infrastructure/mongodb/MongoOrderRepository';
import { MongoDbConstantsProvider } from '../../../contexts/shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { SearchOrderByStatusApp } from '../../../contexts/order/application/search/by-status/SearchOrderByStatusApp';
import { SearchOrderByDateApp } from '../../../contexts/order/application/search/by-date/SearchOrderByDateApp';

export const SearchOrderByStatusAppProvider: NestFactoryProvider = {
    provide: SearchOrderByStatusApp,
    useFactory: (orderSchema) => {
        return new SearchOrderByStatusApp(
            new MongoOrderRepository(orderSchema)
        );
    },
    inject: [
        MongoDbConstantsProvider.ORDER_SCHEMA
    ]
};

export const SearchOrderByDateAppProvider: NestFactoryProvider = {
    provide: SearchOrderByDateApp,
    useFactory: (orderSchema) => {
        return new SearchOrderByDateApp(
            new MongoOrderRepository(orderSchema)
        );
    },
    inject: [
        MongoDbConstantsProvider.ORDER_SCHEMA
    ]
};

export const CreateOrderAppProvider: NestFactoryProvider = {
    provide: CreateOrderApp,
    useFactory: (
        searchOrderByStatusApp: SearchOrderByStatusApp,
        searchOrderByDateApp: SearchOrderByDateApp,
        orderSchema
    ) => {
        return new CreateOrderApp(
            searchOrderByStatusApp,
            searchOrderByDateApp,
            new MongoOrderRepository(orderSchema)
        );
    },
    inject: [
        SearchOrderByStatusApp,
        SearchOrderByDateApp,
        MongoDbConstantsProvider.ORDER_SCHEMA
    ]
};