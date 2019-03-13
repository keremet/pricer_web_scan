import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private auth: AuthService,
              private router: Router,
              private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(!this.auth.loggedIn) {
      this.router.navigateByUrl('/');
      return;
    }
    
    this.renderer.setStyle(this.scanner.previewElemRef.nativeElement, 'height', '100vh');
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
