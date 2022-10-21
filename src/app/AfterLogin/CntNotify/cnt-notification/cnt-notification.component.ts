
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-cnt-notification',
  templateUrl: './cnt-notification.component.html',
  styleUrls: ['./cnt-notification.component.css']
})
export class CntNotificationComponent implements OnInit {
  displayedColumns: string[] = ['Sl.No','Name', 'Action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  constructor(private router: Router,
    private api_call: VirtualEmergencyService
    ) { }
  ngOnInit(): void {
    // this.fetchData();
  }
  routeToMediaModification(_id:any){this.router.navigate(['/cntnotify',btoa(_id)]);}
  fetchData(){
    this.api_call.global_service(0,'/contact_notification',null).pipe(map((x:any) => x.msg)).subscribe(res =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator = this.paginator;
    })
  }
  //For FilterData from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
