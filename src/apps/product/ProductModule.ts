import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from '../authentication/AuthenticationModule';
import { ProductDocumentProvider } from '../../contexts/product/infrastructure/mongodb/ProductDocumentProvider';
import { CreateProductPostController } from './controllers/create/CreateProductPostController';
import { CreateProductCommandHandler } from '../../contexts/product/application/create/CreateProductCommandHandler';
import {
    CreateProductAppProvider,
    SearchProductByCodeAppProvider,
    SearchProductByIdAppProvider, UpdateProductQuantityAppProvider
} from './config/ProductProvider';
import { ClientModule } from '../client/ClientModule';

const commandHandlers = [
    CreateProductCommandHandler,
];

const queryHandlers = [];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
        AuthenticationModule,
        ClientModule,
    ],
    controllers: [
        CreateProductPostController,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...ProductDocumentProvider,
        SearchProductByCodeAppProvider,
        SearchProductByIdAppProvider,
        UpdateProductQuantityAppProvider,
        CreateProductAppProvider,
    ]
})
export class ProductModule{
}