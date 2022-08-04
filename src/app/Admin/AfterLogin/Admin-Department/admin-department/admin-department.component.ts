import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
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
   constructor(public dialog:MatDialog,private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }
   del_id:any='';
   check_respond:any='';
   ngOnInit(): void {this.fetchdata();}
   fetchdata(){
     this.spinner.show();
    this.emergencyservice.global_service('0','/department',"null").pipe(map((x:any)=>x.msg)).subscribe(data=>{
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
    //For Delete Purpose
    modify_modal(id:any,_index:any){
      // this.del_id='',this.del_id=id;
      const disalogConfig=new MatDialogConfig();
      disalogConfig.disableClose=false;
      disalogConfig.autoFocus=true;
      disalogConfig.width='35%';
      disalogConfig.data={id:id,api_name:'/department_del',name:'Department'}
      const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
      dialogref.afterClosed().subscribe(dt=>{
       if(dt){
        this.dataSource.data.splice(_index, 1);
        this.dataSource._updateChangeSubscription();// <== refresh data table
       }
      })
    }
}
