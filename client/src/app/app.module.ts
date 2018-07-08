import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GlobalConfig, ToastrModule } from 'ngx-toastr';
registerLocaleData(localePt, 'pt');

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { PollComponent } from './poll/poll.component';

const toastrOptions: Partial<GlobalConfig> = {
    closeButton: true,
    enableHtml: true,
    extendedTimeOut: 2000,
    positionClass: 'toast-top-center',
    progressBar: true,
    tapToDismiss: false
};

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        PollComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxDatatableModule,
        NgxChartsModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(toastrOptions),
        LoadingBarHttpClientModule,
        FormsModule,
        CoreModule,
        AppRoutes
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' }
    ]
})
export class AppModule { }
