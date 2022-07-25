import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $: any;
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
constructor(private emergencyservice:VirtualEmergencyService,private toaster:ToastrManager,private spinner:NgxSpinnerService) { }

ngOnInit(): void {this.fetchdata();}

fetchdata(){
  this.spinner.show();
  this.emergencyservice.global_service('0','/employee',this.Flag).subscribe(data=>{
    console.log(data);
    this.Employee.length=0;
    this.Employee=data;
   this.Employee=this.Employee.msg;
   this.putdata(this.Employee);
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
    console.log(v.value);
     this.Flag='flag='+v.value;
     this.fetchdata();
  }
      //For Delete Purpose
      modify_modal(id:any){this.del_id='',this.del_id=id;}
      delete_employee(){
        this.emergencyservice.global_service('0','/employee_del','id='+this.del_id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
          // console.log(data);
          this.check_respond=data;
          if(this.check_respond.suc==1){
          this.fetchdata();
            this.toaster.successToastr('Employee deleted successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
            }
            else{
              this.toaster.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
    
            }
        })
      }

}
