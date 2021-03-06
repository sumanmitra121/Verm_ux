import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
    // For Angular material data table paginator//
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import {  NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
          //////END//////
@Component({
  selector: 'app-incident-module',
  templateUrl: './incident-module.component.html',
  styleUrls: ['./incident-module.component.css']
})
export class IncidentModuleComponent implements OnInit {
      //Mat tooltip position
      positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
      position = new FormControl(this.positionOptions[3]);
  displayedColumns: string[] = ['Id','Inc_no', 'Incident_name', 'Date','Action'];
  dataSource=new  MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  headername:any='Incident Module';
  icon:any='fa-database';
  Incident_id:any;
  flag:any='O';
  y:any;
  get_incident:any=[];
  
  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService,private datePipe:DatePipe) { // Create 100 users
   }

  ngOnInit(): void {
    if('edit_incidents' in localStorage){
      this.myFunction();localStorage.removeItem('edit_incidents')}
    this.fetchdata();
  }
  // For snackbar
 myFunction() {
  this.y = document.getElementById("snackbar");
  this.y.className = "snackbar show";
  setTimeout(()=>{ this.y.className = this.y.className.replace("snackbar show", "snackbar"); }, 3000);
}
  fetchdata(){
    this.spinner.show();
    this.emergencyservice.global_service('0','/get_incident','flag=' +this.flag).subscribe(data=>{
      this.get_incident=data;
      this.get_incident=this.get_incident.msg;
     this.putdata(this.get_incident);
    })
  }
  putdata(v:any){  
  this.dataSource=new MatTableDataSource(v);
  this.dataSource.paginator=this.paginator;
  this.spinner.hide();
  }

//For filtering the data from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  check_Active_Inactive(event:any){
    this.flag=event.value;
    this.fetchdata();
  }

}



