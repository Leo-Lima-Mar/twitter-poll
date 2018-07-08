import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Poll } from './models/poll.model';

import { environment } from '../../environments/environment';
import { ExceptionHandler } from '../core/utils/exception.handler';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    protected readonly URL: string = `${environment.baseUrl}poll`;

    constructor(
        private readonly http: HttpClient,
        private readonly exceptionHandler: ExceptionHandler) { }

    public insert(newPoll: Poll): Observable<Poll> {
        return this.http.post<Poll>(this.URL, newPoll)
            .pipe(this.exceptionHandler.catch);
    }

    public getCurrentPoll(): Observable<Poll> {
        return this.http.get<Poll>(this.URL)
            .pipe(this.exceptionHandler.catch);
    }

    public endPoll(): Observable<void> {
        return this.http.delete<void>(this.URL)
            .pipe(this.exceptionHandler.catch);
    }

}
