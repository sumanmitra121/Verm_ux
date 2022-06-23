import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.css']
})
export class AdminDepartmentComponent implements OnInit {
  //Mat tooltip position
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  positionforedit = new FormControl(this.positionOptions[2]);
  positionfordelete = new FormControl(this.positionOptions[3]);
   // Material datatable
   displayedColumns: string[] = ['Sl.No','Department','Action'];
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) matsort!: MatSort;
   dataSource= new MatTableDataSource()
   constructor(public dialog:MatDialog,private emergencyservice:VirtualEmergencyService,private toaster:ToastrManager,private spinner:NgxSpinnerService) { }
   get_department:any=[];
   del_id:any='';
   check_respond:any='';
   ngOnInit(): void {this.fetchdata();}
   fetchdata(){
     this.spinner.show();
    this.emergencyservice.global_service('0','/department',"null").subscribe(data=>{
      // console.log(data);
       this.get_department=data;
       this.get_department=this.get_department.msg;
       this.putdata(this.get_department);
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
    //For Delete Purpose
    modify_modal(id:any){
      // this.del_id='',this.del_id=id;
      const disalogConfig=new MatDialogConfig();
      disalogConfig.disableClose=false;
      disalogConfig.autoFocus=true;
      disalogConfig.width='30%';
      disalogConfig.data={id:id,api_name:'/department_del',name:'Department'}
      const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
      dialogref.afterClosed().subscribe(dt=>{
      this.fetchdata();
      })
    }
    delete_department(){
      this.emergencyservice.global_service('0','/department_del','id='+this.del_id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
        // console.log(data);
         this.check_respond=data;
         if(this.check_respond.suc==1){
         this.fetchdata();
           this.toaster.successToastr('Department deleted successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
           }
           else{
             this.toaster.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
   
           }
      })
    }

}
