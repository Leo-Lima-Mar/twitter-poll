import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private readonly toastr: ToastrService) { }

    public success(
        messages: string | string[],
        title: string = 'Sucesso',
        override?: Partial<IndividualConfig>): void {

        this.toastr.success(this.getFormattedMessage(messages), title, override);
    }

    public info(
        messages: string | string[],
        title: string = 'Aviso',
        override?: Partial<IndividualConfig>): void {

        this.toastr.info(this.getFormattedMessage(messages), title, override);
    }

    public warning(
        messages: string | string[],
        title: string = 'Atenção',
        override: Partial<IndividualConfig> = { disableTimeOut: true }): void {

        this.toastr.warning(this.getFormattedMessage(messages), title, override);
    }

    public error(
        messages: string | string[],
        title: string = 'Erro',
        override: Partial<IndividualConfig> = { disableTimeOut: true }): void {

        this.toastr.error(this.getFormattedMessage(messages), title, override);
    }

    private getFormattedMessage(messages: string | string[]): string {
        let finalMessage: string = '';

        if (messages instanceof Array) {
            messages.forEach((msg: string) => finalMessage += `• ${msg}.<br>`);
        } else {
            finalMessage = messages;
        }
        return finalMessage;
    }

    public closeAll(): void {
        this.toastr.clear();
    }

}
