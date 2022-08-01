import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import {TooltipPosition} from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog,MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-offshore',
  templateUrl: './admin-offshore.component.html',
  styleUrls: ['./admin-offshore.component.css'],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class AdminOffshoreComponent implements OnInit {
  //Mat tooltip position
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  positionforedit = new FormControl(this.positionOptions[2]);
  positionfordelete = new FormControl(this.positionOptions[3]);
  // Material datatable
  displayedColumns: string[] = ['Sl.No','Offshore', 'Location', 'Edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource();
  error_message:any='';
  Flag='A';
  del_id:any='';
  check_respond:any;
  constructor(public dialog: MatDialog,private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {this.fetchdata();}
  fetchdata(){
    this.spinner.show();
    this.emergencyservice.get_offshore(this.Flag).pipe(map((x:any) => x.msg)).subscribe(data=>{
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
       this.Flag=v.value;
        this.fetchdata();
  }
  //For Delete Purpose
  modify_modal(id:any,_index:any){// this.del_id='',this.del_id=id;
    const disalogConfig=new MatDialogConfig();
    disalogConfig.disableClose=false;
    disalogConfig.autoFocus=true;
    disalogConfig.width='35%';
    disalogConfig.data={id:id,api_name:'/offshore_del',name:'Offshore'}
    const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
    dialogref.afterClosed().subscribe(dt=>{
      if(dt){
        this.dataSource.data.splice(_index, 1);
        this.dataSource._updateChangeSubscription();// <== refresh data table
      }
    })
  }


}
