import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as fontawesome from '@fortawesome/fontawesome';
import { faSignInAlt } from '@fortawesome/fontawesome-free-solid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
fontawesome.library.add(faSignInAlt);

import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ConfirmModalDirective } from './components/confirm-modal/confirm-modal.directive';

@NgModule({
    declarations: [
        ConfirmModalDirective,
        ConfirmModalComponent
    ],
    entryComponents: [ ConfirmModalComponent ],
    exports: [
        ConfirmModalDirective
    ],
    imports: [
        CommonModule,
        NgbModule,
        NgxMaskModule,
        FormsModule,
        RouterModule
    ],
    providers: []
})
export class CoreModule { }
