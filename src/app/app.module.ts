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
import { FormsModule } from '@angular/forms';
import { BtnComponent } from './controls/btn/btn.component';
import { IndexViewComponent } from './views/index-view/index-view.component';
import { ReceiptsViewComponent } from './views/receipts-view/receipts-view.component';
import { ReceiptCardComponent } from './controls/receipts/receipt-card/receipt-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicViewComponent,
    ScanViewComponent,
    LoginViewComponent,
    HeaderComponent,
    BtnComponent,
    IndexViewComponent,
    ReceiptsViewComponent,
    ReceiptCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
