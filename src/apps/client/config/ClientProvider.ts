import { NestFactoryProvider } from '../../../contexts/shared/infrastructure/nestjs/NestFactoryProvider';
import { CreateClientApp } from '../../../contexts/client/application/create/CreateClientApp';
import { MongoClientRepository } from '../../../contexts/client/infrastructure/mongodb/MongoClientRepository';
import { MongoDbConstantsProvider } from '../../../contexts/shared/infrastructure/mongodb/MongoDbConstantsProvider';

export const CreateClientAppProvider: NestFactoryProvider = {
    provide: CreateClientApp,
    useFactory: (clientSchema) => {
        return new CreateClientApp(
            new MongoClientRepository(clientSchema),
        );
    },
    inject: [
        MongoDbConstantsProvider.CLIENT_SCHEMA,
    ]
};