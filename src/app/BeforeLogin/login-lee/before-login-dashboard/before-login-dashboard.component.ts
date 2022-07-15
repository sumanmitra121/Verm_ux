import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-login-dashboard',
  templateUrl: './before-login-dashboard.component.html',
  styleUrls: ['./before-login-dashboard.component.css']
})
export class BeforeLoginDashboardComponent implements OnInit {

  constructor() {
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    var d = new Date().toLocaleString('en-US', { timeZone: timeZone });
    console.log(d.split(',')[1]);
  }


  ngOnInit(): void {
  }

}
