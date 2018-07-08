import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    const portNumber: number = 3000;
    await app.listen(process.env.PORT || portNumber);
}
bootstrap();
