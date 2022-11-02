import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientDocumentProvider } from '../../contexts/client/infrastructure/mongodb/ClientDocumentProvider';

const commandHandlers = [];

const queryHandlers = [];

@Module({
    imports: [
        MongoDbConnectionModule,
        CqrsModule,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...ClientDocumentProvider,
    ]
})
export class ClientModule {
}