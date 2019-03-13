import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan-view',
  templateUrl: './scan-view.component.html',
  styleUrls: ['./scan-view.component.less']
})
export class ScanViewComponent implements OnInit {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  title = 'pricer-web';
  scannerFormats = [ BarcodeFormat.QR_CODE ];

  constructor() { }

  ngOnInit() {
  }

  camerasFoundHandler(event: MediaDeviceInfo[]) {
    let list = '';
    event.forEach(it => {
      list += it.label + '\n';
    });
    alert(list);
    this.scanner.scan(event[0].deviceId);
  }

  camerasNotFoundHandler() {
    alert('Устройств не найдено');
  }

  scanCompleteHandler(evt) {
    alert(evt);
  }

}
