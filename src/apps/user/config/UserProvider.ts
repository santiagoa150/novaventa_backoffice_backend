import { NestFactoryProvider } from '../../../contexts/shared/infrastructure/nestjs/NestFactoryProvider';
import { SearchUserByEmailApp } from '../../../contexts/user/application/search/by-email/SearchUserByEmailApp';
import { MongoUserRepository } from '../../../contexts/user/infrastructure/mongodb/MongoUserRepository';
import { MongoDbConstantsProvider } from '../../../contexts/shared/infrastructure/mongodb/MongoDbConstantsProvider';

export const SearchUserByEmailAppProvider: NestFactoryProvider = {
    provide: SearchUserByEmailApp,
    useFactory: (userSchema) => {
        return new SearchUserByEmailApp(
            new MongoUserRepository(userSchema)
        );
    },
    inject: [MongoDbConstantsProvider.USER_SCHEMA],
};