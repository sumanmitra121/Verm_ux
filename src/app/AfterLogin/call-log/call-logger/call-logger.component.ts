import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { IncDetails } from 'src/app/Model/IncDetails';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-call-logger',
  templateUrl: './call-logger.component.html',
  styleUrls: ['./call-logger.component.css']
})
export class CallLoggerComponent implements OnInit {
  headername:any='Call Logger';
  icon:any='fa-phone';
  id:any=0;
  del_id:any;
  check_respond:any;
  get_call_log:any=[];
  displayedColumns: string[] = ['ref No.','Call Date Time','Made By', 'Made To','Action'];
  dataSource= new MatTableDataSource();
  @ViewChild(MatSort) matsort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private emergencyService:VirtualEmergencyService,
    private dialog:MatDialog,
    private toastr:ToastrManager,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // this.fetchdata();
  }
  fetchdata(id:any){
    // this.spinner.show()
    this.emergencyService.global_service('0','/call_log','inc_id=' + id).pipe(map((x:any)=> x.msg)).subscribe(data=>{this.putdata(data);})
  }
  putdata(v:any){
    this.dataSource=new MatTableDataSource(v);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.matsort;
    this.spinner.hide();
  }
    //For FilterData from data table
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    modify_modal(id:any,_index:any){
      this.del_id='';
      this.del_id=id;
      const disalogConfig=new MatDialogConfig();
      disalogConfig.disableClose=false;
      disalogConfig.autoFocus=true;
      disalogConfig.width='35%';
      disalogConfig.data={id:id,api_name:'/call_log_del',name:'board Type'}
      const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
      dialogref.afterClosed().subscribe(dt=>{
       if(dt){
         this.spinner.show();
        this.delete_call_log(id,_index);
       }
      })
    }
    delete_call_log(id:any,_index:any){
      this.emergencyService.global_service('0','/call_log_del','id='+id+'&user='+localStorage.getItem('Email')).subscribe((data:any)=>{
        if(data.suc==1){
          this.dataSource.data.splice(_index, 1);
          this.dataSource._updateChangeSubscription();// <== refresh data table
          this.toastr.successToastr('Call Log deleted successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:5000})
          }
          else{
            this.toastr.errorToastr('Something went wrong, failed to delete','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:5000})
          }
         this.spinner.hide();
      })
    }
    getIncDetails(_e:IncDetails){
    this.spinner.show()

      this.fetchdata(_e.id);}
}
