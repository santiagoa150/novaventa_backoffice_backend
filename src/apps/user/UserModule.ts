import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { UserDocumentProvider } from '../../contexts/user/infrastructure/mongodb/UserDocumentProvider';
import { SearchUserByEmailAppProvider } from './config/UserProvider';

const commandHandlers = [];

const queryHandlers = [];

@Module({
    imports: [ 
        MongoDbConnectionModule,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...UserDocumentProvider,
        SearchUserByEmailAppProvider,
    ],
    exports: [
        ...UserDocumentProvider,
        SearchUserByEmailAppProvider,
    ],
})
export class UserModule{
}