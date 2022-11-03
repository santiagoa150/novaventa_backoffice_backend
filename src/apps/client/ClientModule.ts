import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientDocumentProvider } from '../../contexts/client/infrastructure/mongodb/ClientDocumentProvider';
import { CreateClientPostController } from './controllers/create/CreateClientPostController';
import { CreateClientCommandHandler } from '../../contexts/client/application/create/CreateClientCommandHandler';
import { CreateClientAppProvider } from './config/ClientProvider';

const commandHandlers = [
    CreateClientCommandHandler,
];

const queryHandlers = [];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
    ],
    controllers: [
        CreateClientPostController,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...ClientDocumentProvider,
        CreateClientAppProvider,
    ]
})
export class ClientModule {
}