import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ReceiptsService, ReceiptResult } from 'src/app/services/receipts/receipts.service';

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

  cameras: MediaDeviceInfo[];
  private currentCam = 0;

  constructor(private auth: AuthService,
              private router: Router,
              private renderer: Renderer2,
              private receipts: ReceiptsService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    if(!this.auth.loggedIn) {
      this.router.navigateByUrl('/');
      return;
    }

    this.renderer.setStyle(this.scanner.previewElemRef.nativeElement, 'height', '100vh');
    this.renderer.setStyle(this.scanner.previewElemRef.nativeElement, 'pointer-events', 'none');
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    this.scanner.scan(cameras[0].deviceId);
  }

  reloadClicked() {
    this.currentCam = (this.currentCam == this.cameras.length - 1) 
                        ? 0 : this.currentCam + 1;
    this.scanner.changeDeviceById(this.cameras[this.currentCam].deviceId);
  }

  listClicked() {
    this.router.navigate(['receipts']);
  }

  camerasNotFoundHandler() {
    alert('Устройств не найдено');
  }

  scanCompleteHandler(data) {
    let res = this.receipts.addScanned(data.text);
    switch(res) {
      case ReceiptResult.EXISTS:
        alert('Этот чек уже добавлен');
        return;
      case ReceiptResult.INCORRECT:
        alert('Неподдерживаемый QR-код');
        return;
    }

    alert('Чек отсканирован');
  }

}
