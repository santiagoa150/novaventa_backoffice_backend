import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger: Logger = new Logger('SERVER');
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(process.env.GLOBAL_PREFIX);

    const options = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE)
        .setDescription(process.env.SWAGGER_DESCRIPTION)
        .setVersion(process.env.SWAGGER_VERSION)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(process.env.SWAGGER_URI, app, document);

    await app.listen(Number(process.env.PORT));
    logger.log(`SERVER LISTEN ON PORT: ${process.env.PORT}`);
}
bootstrap();
