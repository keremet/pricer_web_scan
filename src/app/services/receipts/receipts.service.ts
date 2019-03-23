import { Injectable } from '@angular/core';
import { ReceiptScan } from 'src/app/data/receipts/receipt';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponseData } from '../api.types';
import { AuthService } from '../auth/auth.service';

const RECEIPTS_SCANNED_KEY = 'receipts_scanned';
const RECEIPTS_SENT_KEY = 'receipts_sent';

export enum ReceiptResult {
  OK = 0,
  INCORRECT,
  EXISTS
}


@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  private _sending = false;

  private _scanned: ReceiptScan[] = [];
  private _sent: ReceiptScan[] = [];

  constructor(private storage: LocalStorageService,
              private http: HttpClient,
              private auth: AuthService) {
    this.fromStorage();

    let len = this._scanned.length;
    if(len)
      this.sendOne(len - 1);
  }


  public addScanned(blob: string): ReceiptResult {
    let item = new ReceiptScan(blob);
    if(!item.correct)
      return ReceiptResult.INCORRECT;

    if(this.exists(blob, this._scanned) || this.exists(blob, this._sent))
      return ReceiptResult.EXISTS;

    let index = this._scanned.push(item) - 1;
    this.toStorage();

    if(!this._sending) {
      this.sendOne(index)
          .then(res => {
            this.sendOneComplete(res);
          });
    }

    return ReceiptResult.OK;
  }

  get scanned() {
    return this._scanned;
  }

  get sent() {
    return this._sent;
  }

  private sendOneComplete(res: ApiResponseData) {
    if(!res.success) return;

    let len = this._scanned.length;
    if(len) this.sendOne(len - 1);
  }

  private sendOne(index: number): Promise<ApiResponseData> {
    this._sending = true;

    let data = this.auth.loginData;
    
    return new Promise<ApiResponseData>(resolve => {

      this.http.post<ApiResponseData>(
        'https://api.pricer.versla.ru/receipt/send', 
        this._scanned[index].blob,
        {
          params: {
            login: data.login,
            password: data.password,
          },
          headers: new HttpHeaders({
            'Content-Type': 'application/text'
          })
        }
      ).subscribe(res => {
          this._sending = false;
          
          if(res.success) {

            this._sent.push(this._scanned.splice(index, 1)[0]);
            this.toStorage();
            resolve(res);

          } else {
            resolve(res);
          }
        
        }, res => {
          this._sending = false;
          resolve(res.error);
        },
      );

    });
  }


  private exists(blob: string, arr: ReceiptScan[]) {
    return arr.findIndex(it => {
      return it.blob == blob;
    }) !== -1;
  }

  private toStorage() {
    this.storage.writeData(RECEIPTS_SCANNED_KEY, this._scanned.map(val => {
      return val.blob;
    }));
    this.storage.writeData(RECEIPTS_SENT_KEY, this._sent.map(val => {
      return val.blob;
    }));
  }

  private fromStorage() {
    if(this.storage.exists(RECEIPTS_SCANNED_KEY)) {

      (this.storage.readData(RECEIPTS_SCANNED_KEY) as string[]).forEach(v => {
        this._scanned.push(new ReceiptScan(v));
      });

    }

    if(this.storage.exists(RECEIPTS_SENT_KEY)) {

      (this.storage.readData(RECEIPTS_SENT_KEY) as string[]).forEach(v => {
        this._sent.push(new ReceiptScan(v));
      });
      
    }
    
  }

}
