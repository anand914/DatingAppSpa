import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
// tslint:disable-next-line: no-trailing-whitespace
@Input() user: User;  // @input  are used for communicate componet from parent to child // 
  constructor() { }

  ngOnInit(): void {
  }

}
