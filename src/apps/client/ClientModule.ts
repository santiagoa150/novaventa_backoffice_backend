import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientDocumentProvider } from '../../contexts/client/infrastructure/mongodb/ClientDocumentProvider';
import { CreateClientPostController } from './controllers/create/CreateClientPostController';
import { CreateClientCommandHandler } from '../../contexts/client/application/create/CreateClientCommandHandler';
import {
    CreateClientAppProvider,
    SearchAllClientsAppProvider,
    SearchClientByIdAppProvider,
    UpdateClientAppProvider
} from './config/ClientProvider';
import { SearchAllClientsGetController } from './controllers/search/all/SearchAllClientsGetController';
import {
    SearchAllClientsQueryHandler
} from '../../contexts/client/application/search/all/SearchAllClientsQueryHandler';
import { SearchClientByIdGetController } from './controllers/search/by-id/SearchClientByIdGetController';
import {
    SearchClientByIdQueryHandler
} from '../../contexts/client/application/search/by-id/SearchClientByIdQueryHandler';
import { UpdateClientPutController } from './controllers/update/UpdateClientPutController';
import { UpdateClientCommandHandler } from '../../contexts/client/application/update/UpdateClientCommandHandler';
import { AuthenticationModule } from '../authentication/AuthenticationModule';

const commandHandlers = [
    CreateClientCommandHandler,
    UpdateClientCommandHandler
];

const queryHandlers = [
    SearchClientByIdQueryHandler,
    SearchAllClientsQueryHandler
];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
        AuthenticationModule,
    ],
    controllers: [
        CreateClientPostController,
        SearchClientByIdGetController,
        SearchAllClientsGetController,
        UpdateClientPutController
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...ClientDocumentProvider,
        CreateClientAppProvider,
        SearchClientByIdAppProvider,
        SearchAllClientsAppProvider,
        UpdateClientAppProvider
    ],
    exports: [
        SearchClientByIdAppProvider,
    ]
})
export class ClientModule {
}