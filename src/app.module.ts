import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './apps/authentication/AuthenticationModule';
import { ClientModule } from './apps/client/ClientModule';
import { OrderModule } from './apps/order/OrderModule';
import { ProductModule } from './apps/product/ProductModule';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        AuthenticationModule,
        ClientModule,
        OrderModule,
        ProductModule,
    ]
})
export class AppModule {
}
