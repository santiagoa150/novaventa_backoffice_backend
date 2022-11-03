import { Module } from '@nestjs/common';
import { MongoDbConnectionModule } from '../../contexts/shared/infrastructure/mongodb/MongoDbConnectionModule';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../user/UserModule';
import { LoginPostController } from './controllers/login/LoginPostController';
import { LocalStrategy } from '../../contexts/shared/infrastructure/auth/strategies/local/LocalStrategy';
import { LoginCommandHandler } from '../../contexts/authentication/application/login/LoginCommandHandler';
import { LoginAppProvider } from './config/AuthenticationProvider';
import { BuildPayloadCommandHandler } from '../../contexts/authentication/application/login/BuildPayloadCommandHandler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MeGetController } from './controllers/me/MeGetController';
import { MeQueryHandler } from '../../contexts/authentication/application/me/MeQueryHandler';
import { JwtStrategy } from '../../contexts/shared/infrastructure/auth/strategies/jwt/JwtStrategy';

const commandHandlers = [
    LoginCommandHandler,
    BuildPayloadCommandHandler,
    MeQueryHandler,
];

const queryHandlers = [];

@Module({
    imports: [
        MongoDbConnectionModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '4h'},
        }),
        CqrsModule,
        UserModule,
    ],
    controllers: [
        LoginPostController,
        MeGetController,
    ],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        LocalStrategy,
        JwtStrategy,
        LoginAppProvider,
    ],
    exports: [
        JwtStrategy,
    ]
})
export class AuthenticationModule {
}