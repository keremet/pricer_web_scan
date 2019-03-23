import { Component, OnInit } from '@angular/core';
import { ReceiptScan } from 'src/app/data/receipts/receipt';
import { ReceiptsService } from 'src/app/services/receipts/receipts.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipts-view',
  templateUrl: './receipts-view.component.html',
  styleUrls: ['./receipts-view.component.less']
})
export class ReceiptsViewComponent implements OnInit {

  private _scanned: ReceiptScan[];
  private _sent: ReceiptScan[];

  constructor(private api: ReceiptsService,
              private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this._scanned = this.api.scanned;
    this._sent = this.api.sent;
  }

  ngAfterViewInit() {
    if(!this.auth.loggedIn) {
      this.router.navigateByUrl('/');
      return;
    }
  }

  get scanned() {
    return this._scanned;
  }

  get sent() {
    return this._sent;
  }

}
