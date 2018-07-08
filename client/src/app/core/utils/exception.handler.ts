import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class ExceptionHandler {

    public catch: OperatorFunction<any, any> = catchError((error: any): Observable<any> => {
        if (!error.error.messages) {
            error.error.messages = ['Servidor indisponível'];
        }
        this.toast.error(error.error.messages, error.error.title);
        throw error;
    });

    constructor(private readonly toast: ToastService) { }

}
