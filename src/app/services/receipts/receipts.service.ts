import { Injectable } from '@angular/core';
import { ReceiptScan } from 'src/app/data/receipts/receipt';
import { LocalStorageService } from '../local-storage/local-storage.service';

const RECEIPTS_SCANNED_KEY = 'receipts_scanned';

export enum ReceiptResult {
  OK = 0,
  INCORRECT,
  EXISTS
}


@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  private _scanned: ReceiptScan[] = [];

  constructor(private storage: LocalStorageService) {
    this.fromStorage();
  }


  public addScanned(blob: string): ReceiptResult {
    let item = new ReceiptScan(blob);
    if(!item.correct)
      return ReceiptResult.INCORRECT;

    if(this.exists(blob))
      return ReceiptResult.EXISTS;

    this._scanned.push(item);
    this.storage.writeData(RECEIPTS_SCANNED_KEY, this._scanned.map(val => {
      return val.blob;
    }));
    return ReceiptResult.OK;
  }

  get scanned() {
    return this._scanned;
  }


  private exists(blob: string) {
    return this._scanned.findIndex(it => {
      return it.blob == blob;
    }) !== -1;
  }

  private fromStorage() {
    if(!this.storage.exists(RECEIPTS_SCANNED_KEY)) 
      return;

    (this.storage.readData(RECEIPTS_SCANNED_KEY) as string[]).forEach(v => {
      this._scanned.push(new ReceiptScan(v));
    });
  }

}
