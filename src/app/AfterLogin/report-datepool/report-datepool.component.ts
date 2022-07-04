import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-datepool',
  templateUrl: './report-datepool.component.html',
  styleUrls: ['./report-datepool.component.css']
})
export class ReportDatepoolComponent implements OnInit {
headername:any='Report Date Pool';
 icon:any='fa-calendar';
constructor(private router:Router) { }

  ngOnInit(): void {
  }
  routetoreportdatapool(mode:any){
    this.router.navigate(['/admin/reportdatapoolDetails/',mode]);
  }

}
