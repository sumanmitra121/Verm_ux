import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css']
})
export class AdminTeamComponent implements OnInit {
    //Mat tooltip position
    positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
    positionforedit = new FormControl(this.positionOptions[2]);
    positionfordelete = new FormControl(this.positionOptions[3]);
 // Material datatable
 displayedColumns: string[] = ['Sl.No','Team_Type','Team_Name','Action'];
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) matsort!: MatSort;
 dataSource= new MatTableDataSource()
 constructor(private emergencyservice:VirtualEmergencyService,private toaster:ToastrManager,private spinner:NgxSpinnerService) { }
 get_team:any=[];
 del_id:any='';
  check_respond:any='';
 ngOnInit(): void {this.fetchdata();}
 fetchdata(){
   this.spinner.show();
  this.emergencyservice.global_service('0','/teams',"null").subscribe(data=>{
    // console.log(data);
   this.get_team=data;
   this.get_team=this.get_team.msg;
   this.putdata(this.get_team);
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
      modify_modal(id:any){this.del_id='',this.del_id=id;}
      delete_team(){
        this.emergencyservice.global_service('0','/teams_del','id='+this.del_id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
          // console.log(data);
          this.check_respond=data;
          if(this.check_respond.suc==1){
          this.fetchdata();
          this.toaster.successToastr('Team deleted successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
          }
          else{
            this.toaster.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
          }
        })
      }


}
