import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-receipt-card',
  templateUrl: './receipt-card.component.html',
  styleUrls: ['./receipt-card.component.less']
})
export class ReceiptCardComponent implements OnInit {

  @Input() price: number;
  @Input() date: Date;
  
  private _year: number;

  private _months = [
    'января','февраля', 'марта', 'апреля', 'мая','июня', 'июля','августа','сентября','октября','ноября','декабря',
  ];

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    this._year = new Date().getFullYear();
  }

  dateFormat(date: Date) {
    let out = date.getDate() + ' ' + this._months[date.getMonth()];
    
    let year = date.getFullYear();
    if(year < this._year)
      out += ' ' + year;

    return out;
  }
  

}
