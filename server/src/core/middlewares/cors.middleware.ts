import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { CONFIG } from '../../../config';

@Injectable()
export class CorsMiddleware implements NestMiddleware {

    constructor() {}

    public async resolve(): Promise<MiddlewareFunction> {
        return async (req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', CONFIG.accessControlAllowOrigin);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader(
                'Access-Control-Allow-Headers',
                'X-Requested-With, Authorization, Content-Type, Cache-Control');

            return (req.method === 'OPTIONS') ? res.end() : next();
        };
    }

}
