import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './apps/authentication/AuthenticationModule';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        AuthenticationModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
