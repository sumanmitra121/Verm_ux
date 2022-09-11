import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';

@Component({
  selector: 'app-meeting-dashboard',
  templateUrl: './meeting-dashboard.component.html',
  styleUrls: ['./meeting-dashboard.component.css']
})
export class MeetingDashboardComponent implements OnInit {
  _url=global_url_test.URL;
  displayedColumns: string[] = ['Id', 'Ref', 'Meeting_date', 'Attend_by','Action'];
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router:Router,private api_call: VirtualEmergencyService) { }

  ngOnInit(): void {
    this.fetchdata()
  }
  fetchdata(){
  this.api_call.global_service(0,'/meeting',null).pipe(map((x:any) => x.msg)).subscribe(res =>{
     console.log(res);

     this.dataSource = new MatTableDataSource(res);
  })
  }
  ngAfterViewInit(){this.dataSource.paginator = this.paginator;}
  routeToModifyMeeting(id:any,type:any){
     console.log(type);

    this.router.navigate(['/meeting',btoa(id),btoa(type)]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
