import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.less']
})
export class BtnComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
