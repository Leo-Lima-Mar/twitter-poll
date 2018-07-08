import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal.component';

@Directive({
    selector: '[appConfirmModal]'
})
export class ConfirmModalDirective {

    @Output('appConfirmModal') public onConfirm: EventEmitter<void> = new EventEmitter<void>();

    constructor(private readonly ngbModal: NgbModal) { }

    @HostListener('click')
    public onClick(): void {
        this.ngbModal.open(ConfirmModalComponent, { backdrop: 'static', keyboard: false })
            .result.then((confirm: boolean) => {
                if (confirm) {
                    this.onConfirm.emit();
                }
            });
    }
}
