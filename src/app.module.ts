import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './apps/authentication/AuthenticationModule';
import { ClientModule } from './apps/client/ClientModule';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        AuthenticationModule,
        ClientModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
