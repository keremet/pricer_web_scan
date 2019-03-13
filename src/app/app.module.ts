import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BasicViewComponent } from './views/basic-view/basic-view.component';
import { ScanViewComponent } from './views/scan-view/scan-view.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { HeaderComponent } from './controls/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicViewComponent,
    ScanViewComponent,
    LoginViewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
