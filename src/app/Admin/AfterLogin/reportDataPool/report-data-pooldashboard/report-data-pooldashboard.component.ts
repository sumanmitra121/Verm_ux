import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-data-pooldashboard',
  templateUrl: './report-data-pooldashboard.component.html',
  styleUrls: ['./report-data-pooldashboard.component.css']
})
export class ReportDataPooldashboardComponent implements OnInit {
  constructor(private router:Router) {}
  ngOnInit(): void {}
  routetoreportdatapool(mode:any){this.router.navigate(['/admin/reportdatapoolDetails/',mode]);}
}
