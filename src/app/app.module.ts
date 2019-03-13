import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BasicViewComponent } from './views/basic-view/basic-view.component';
import { ScanViewComponent } from './views/scan-view/scan-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicViewComponent,
    ScanViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
