
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
    // For Angular material data table paginator//
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TooltipPosition } from '@angular/material/tooltip';
import {NgxSpinnerService } from 'ngx-spinner';
import {map } from 'rxjs/operators';
import {VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
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

  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {this.fetchdata();}

  fetchdata(){
    this.spinner.show();
    console.log('incident');
   var _app_flag = this.flag == 'A' ? 'A' : null
    this.emergencyservice.global_service('0','/get_incident','flag=' +this.flag +'&approval_flag='+ _app_flag).pipe(map((x:any)=>x.msg)).subscribe(data=>{
      console.log(data);

      this.get_incident=data;
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



