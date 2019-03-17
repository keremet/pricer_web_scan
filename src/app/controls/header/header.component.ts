import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input() back = false;
  @Input() title = '';
  @Output() backClick = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  backClicked() {
    this.backClick.emit();
  }

}
