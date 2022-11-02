import { NestFactoryProvider } from '../../../contexts/shared/infrastructure/nestjs/NestFactoryProvider';
import { LoginApp } from '../../../contexts/authentication/application/login/LoginApp';
import { SearchUserByEmailApp } from '../../../contexts/user/application/search/by-email/SearchUserByEmailApp';
import { JwtModule, JwtService } from '@nestjs/jwt';

export const LoginAppProvider: NestFactoryProvider = {
    imports: [JwtModule],
    provide: LoginApp,
    useFactory: (searchUserByEmailApp: SearchUserByEmailApp, jwt: JwtService) => {
        return new LoginApp(
            searchUserByEmailApp,
            jwt,
        );
    },
    inject: [
        SearchUserByEmailApp,
        JwtService,
    ]
};