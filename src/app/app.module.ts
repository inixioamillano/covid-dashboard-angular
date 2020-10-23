import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { DatoComponent } from './dato/dato.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TablaComponent } from './tabla/tabla.component';
import { HaceTiempoPipe } from './pipes/hace-tiempo.pipe';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './services/pwa-service.service';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    DatoComponent,
    TablaComponent,
    HaceTiempoPipe
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    FontAwesomeModule,
    NgxLoadingModule,
    FormsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DatePipe, {provide: LOCALE_ID, useValue: 'es-*'}, PwaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
