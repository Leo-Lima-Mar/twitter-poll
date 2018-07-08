import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

    constructor(private readonly ngbActiveModal: NgbActiveModal) { }

    public ok(): void {
        this.ngbActiveModal.close(true);
    }

    public cancel(): void {
        this.ngbActiveModal.close(false);
    }

}
