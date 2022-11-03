import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientDocumentProvider } from '../../contexts/client/infrastructure/mongodb/ClientDocumentProvider';
import { CreateClientPostController } from './controllers/create/CreateClientPostController';
import { CreateClientCommandHandler } from '../../contexts/client/application/create/CreateClientCommandHandler';
import { CreateClientAppProvider, SearchAllClientsAppProvider } from './config/ClientProvider';
import { SearchAllClientsGetController } from './controllers/search/all/SearchAllClientsGetController';
import {
    SearchAllClientsQueryHandler
} from '../../contexts/client/application/search/all/SearchAllClientsQueryHandler';

const commandHandlers = [
    CreateClientCommandHandler,
];

const queryHandlers = [
    SearchAllClientsQueryHandler,
];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
    ],
    controllers: [
        CreateClientPostController,
        SearchAllClientsGetController,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...ClientDocumentProvider,
        CreateClientAppProvider,
        SearchAllClientsAppProvider,
    ]
})
export class ClientModule {
}