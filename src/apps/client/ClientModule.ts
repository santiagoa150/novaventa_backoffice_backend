import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientDocumentProvider } from '../../contexts/client/infrastructure/mongodb/ClientDocumentProvider';
import { CreateClientPostController } from './controllers/create/CreateClientPostController';
import { CreateClientCommandHandler } from '../../contexts/client/application/create/CreateClientCommandHandler';
import {
    CreateClientAppProvider,
    SearchAllClientsAppProvider,
    SearchClientByIdAppProvider
} from './config/ClientProvider';
import { SearchAllClientsGetController } from './controllers/search/all/SearchAllClientsGetController';
import {
    SearchAllClientsQueryHandler
} from '../../contexts/client/application/search/all/SearchAllClientsQueryHandler';
import { SearchClientByIdGetController } from './controllers/search/by-id/SearchClientByIdGetController';
import {
    SearchClientByIdQueryHandler
} from '../../contexts/client/application/search/by-id/SearchClientByIdQueryHandler';

const commandHandlers = [
    CreateClientCommandHandler,
];

const queryHandlers = [
    SearchClientByIdQueryHandler,
    SearchAllClientsQueryHandler,
];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
    ],
    controllers: [
        CreateClientPostController,
        SearchClientByIdGetController,
        SearchAllClientsGetController,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...ClientDocumentProvider,
        CreateClientAppProvider,
        SearchClientByIdAppProvider,
        SearchAllClientsAppProvider,
    ]
})
export class ClientModule {
}