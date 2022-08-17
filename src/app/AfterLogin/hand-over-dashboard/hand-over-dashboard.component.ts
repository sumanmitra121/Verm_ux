import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hand-over-dashboard',
  templateUrl: './hand-over-dashboard.component.html',
  styleUrls: ['./hand-over-dashboard.component.css']
})
export class HandOverDashboardComponent implements OnInit {
  displayedColumns: string[] = ['Id','Hanover_From','Hanover_To','Handover_against', 'Reason_Of_Header'];
  dataSource= new MatTableDataSource();
  @ViewChild(MatSort) matsort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _api_call:VirtualEmergencyService) { }

  ngOnInit(): void {
    // this.fetchdata();
  }
  fetchdata(_id:any){
     this._api_call.global_service('0','/handover','inc_id='+_id).pipe(map((x:any) => x.msg)).subscribe(res => {
       console.log(res);
       this.dataSource = new MatTableDataSource(res);
     })
  }
  ngAfterViewInit(){this.dataSource.paginator = this.paginator;}
 //For FilterData from data table
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
getIncDetails(_event:any){this.fetchdata(_event.id)}
}
