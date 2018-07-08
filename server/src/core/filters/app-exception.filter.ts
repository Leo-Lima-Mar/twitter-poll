import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { logger } from '../helpers/logger';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {

    constructor(private readonly message: string) { }

    public catch(exception: Error, argumentsHost: ArgumentsHost): void {
        const response: Response = argumentsHost.switchToHttp().getResponse();
        console.error(`[AppExceptionFilter] ${this.message}\n${exception.message}`);
        logger.error(`[AppExceptionFilter] ${this.message}\n${exception.message}`);

        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ messages: this.message, title: 'Erro interno do servidor' });
    }

}
