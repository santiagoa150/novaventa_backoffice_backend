import { NestFactoryProvider } from '../../../contexts/shared/infrastructure/nestjs/NestFactoryProvider';
import { CreateProductApp } from '../../../contexts/product/application/create/CreateProductApp';
import { SearchClientByIdApp } from '../../../contexts/client/application/search/by-id/SearchClientByIdApp';
import { MongoDbConstantsProvider } from '../../../contexts/shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { MongoProductRepository } from '../../../contexts/product/infrastructure/mongodb/MongoProductRepository';
import { SearchProductByCodeApp } from '../../../contexts/product/application/search/by-code/SearchProductByCodeApp';
import { SearchProductByIdApp } from '../../../contexts/product/application/search/by-id/SearchProductByIdApp';
import {
    UpdateProductQuantityApp
} from '../../../contexts/product/application/update/quantity/UpdateProductQuantityApp';

export const SearchProductByCodeAppProvider: NestFactoryProvider = {
    provide: SearchProductByCodeApp,
    useFactory: (productSchema) => {
        return new SearchProductByCodeApp(
            new MongoProductRepository(productSchema),
        );
    },
    inject: [
        MongoDbConstantsProvider.PRODUCT_SCHEMA
    ]
};

export const SearchProductByIdAppProvider: NestFactoryProvider = {
    provide: SearchProductByIdApp,
    useFactory: (productSchema) => {
        return new SearchProductByIdApp(
            new MongoProductRepository(productSchema),
        );
    },
    inject: [
        MongoDbConstantsProvider.PRODUCT_SCHEMA
    ]
};

export const UpdateProductQuantityAppProvider: NestFactoryProvider = {
    provide: UpdateProductQuantityApp,
    useFactory: (searchProductByIdApp: SearchProductByIdApp, productSchema) => {
        return new UpdateProductQuantityApp(
            searchProductByIdApp,
            new MongoProductRepository(productSchema),
        );
    },
    inject: [
        SearchProductByIdApp,
        MongoDbConstantsProvider.PRODUCT_SCHEMA,
    ]
};

export const CreateProductAppProvider: NestFactoryProvider = {
    provide: CreateProductApp,
    useFactory: (searchClientByIdApp: SearchClientByIdApp, productSchema) => {
        return new CreateProductApp(
            searchClientByIdApp,
            new MongoProductRepository(productSchema),
        );
    },
    inject: [
        SearchClientByIdApp,
        MongoDbConstantsProvider.PRODUCT_SCHEMA,
    ]
};