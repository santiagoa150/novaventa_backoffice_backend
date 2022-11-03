import { NestFactoryProvider } from '../../../contexts/shared/infrastructure/nestjs/NestFactoryProvider';
import { CreateClientApp } from '../../../contexts/client/application/create/CreateClientApp';
import { MongoClientRepository } from '../../../contexts/client/infrastructure/mongodb/MongoClientRepository';
import { MongoDbConstantsProvider } from '../../../contexts/shared/infrastructure/mongodb/MongoDbConstantsProvider';
import { SearchAllClientsApp } from '../../../contexts/client/application/search/all/SearchAllClientsApp';
import { SearchClientByIdApp } from '../../../contexts/client/application/search/by-id/SearchClientByIdApp';

export const CreateClientAppProvider: NestFactoryProvider = {
    provide: CreateClientApp,
    useFactory: (clientSchema) => {
        return new CreateClientApp(
            new MongoClientRepository(clientSchema)
        );
    },
    inject: [
        MongoDbConstantsProvider.CLIENT_SCHEMA
    ]
};

export const SearchClientByIdAppProvider: NestFactoryProvider = {
    provide: SearchClientByIdApp,
    useFactory: (clientSchema) => {
        return new SearchClientByIdApp(
            new MongoClientRepository(clientSchema),
        );
    },
    inject: [MongoDbConstantsProvider.CLIENT_SCHEMA]
};

export const SearchAllClientsAppProvider: NestFactoryProvider = {
    provide: SearchAllClientsApp,
    useFactory: (clientSchema) => {
        return new SearchAllClientsApp(
            new MongoClientRepository(clientSchema)
        );
    },
    inject: [
        MongoDbConstantsProvider.CLIENT_SCHEMA
    ]
};