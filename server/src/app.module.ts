
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CorsMiddleware } from './core/middlewares/cors.middleware';
import { logger } from './core/helpers/logger';
import { MorganMiddleware } from './core/middlewares/morgan.middleware';
import { PollController } from './poll/poll.controller';
import { PollService } from './poll/poll.service';

@Module({
    controllers: [ PollController ],
    imports: [],
    providers: [ PollService ]
})
export class AppModule implements NestModule {

    public configure(consumer: MiddlewareConsumer): void {
        MorganMiddleware.configure('common', {
            stream: {
                write: (message: string): void => {
                    logger.info(message);
                    console.info(message);
                }
            }
        });
        consumer.apply([ CorsMiddleware, MorganMiddleware ])
            .forRoutes('*');
    }

}
