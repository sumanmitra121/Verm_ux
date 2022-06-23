import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Incident_name', 'Date','Action'];
  dataSource=new  MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  headername:any='Incident Module';
  icon:any='fa-database';
  Incident_id:any;
  flag:any='O';
  get_incident:any=[];
  y:any;
  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    if('edit_close_incidents' in localStorage){
      this.myFunction();localStorage.removeItem('edit_close_incidents');
    }
    this.fetchdata();
  }
  //For Snackbar
  myFunction(){
    this.y = document.getElementById("snackbar");
    this.y.className = "snackbar show";
    setTimeout(()=>{ this.y.className = this.y.className.replace("snackbar show", "snackbar"); }, 3000);
  }
  fetchdata(){
    // this.spinner.show();
    this.emergencyservice.global_service('0','/get_incident','flag=' +this.flag).subscribe(data=>{
      // console.log(data);
      this.get_incident=data;
      this.get_incident=this.get_incident.msg;
      this.putdata(this.get_incident);
    })
  }
  putdata(v:any){  
  this.dataSource=new MatTableDataSource(v);
  this.dataSource.paginator=this.paginator;
  // this.spinner.hide();
  }

//For filtering the data from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
