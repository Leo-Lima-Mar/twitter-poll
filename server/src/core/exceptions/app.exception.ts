import { HttpStatus } from '@nestjs/common';

export class AppException extends Error {

    constructor(
        public readonly title: string,
        public readonly message: string,
        public readonly httpStatus?: number) {

        super();

        this.title = title || 'Erro';
        this.message = message || 'O pedido não pode ser entendido';
        this.httpStatus = httpStatus || HttpStatus.BAD_REQUEST;
    }

}
