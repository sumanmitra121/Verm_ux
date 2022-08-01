import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css']
})
export class AdminEmployeeComponent implements OnInit {
    //Mat tooltip position
    positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
    positionforedit = new FormControl(this.positionOptions[2]);
    positionfordelete = new FormControl(this.positionOptions[3]);
// Material datatable
displayedColumns: string[] = ['Sl.No','Name', 'Contact_No.', 'Edit'];
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matsort!: MatSort;
dataSource= new MatTableDataSource();
Flag:any='flag='+ 'A';
Employee:any=[];
del_id:any='';
check_respond:any='';
constructor(private emergencyservice:VirtualEmergencyService,
  private spinner:NgxSpinnerService) { }

ngOnInit(): void {this.fetchdata();}

fetchdata(){
  this.spinner.show();
  this.emergencyservice.global_service('0','/employee',this.Flag).pipe(map((x:any)=> x.msg)).subscribe(data=>{
   this.putdata(data);
  this.spinner.hide();
  })
}
putdata(v:any){
this.dataSource=new MatTableDataSource(v);
this.dataSource.paginator=this.paginator;
this.dataSource.sort=this.matsort;
}
  //For FilterData from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //get the value of checked radio button,depending on which the data of of the datatable is to be shown
  check_Active_Inactive(v:any){
     this.Flag='flag='+v.value;
     this.fetchdata();
  }
}
