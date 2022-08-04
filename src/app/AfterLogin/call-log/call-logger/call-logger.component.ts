import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
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

  constructor(private emergencyService:VirtualEmergencyService,private toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // this.fetchdata();
  }
  fetchdata(id:any){
    this.spinner.show()
    this.emergencyService.global_service('0','/call_log','inc_id=' + id).pipe(map((x:any)=> x.msg)).subscribe(data=>{
      console.log(data);
           this.putdata(data);
        //  this.get_call_log=data;
        //  this.get_call_log=this.get_call_log.msg;
        //  if(this.get_call_log!=''){
        //    this.putdata(this.get_call_log);
        //  }
        //  else{
        //    this.spinner.hide();
        //  }
    })


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
    modify_modal(id:any){this.del_id='',this.del_id=id;}
    delete_call_log(){
      this.emergencyService.global_service('0','/call_log_del','id='+this.del_id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
        console.log(data);
        this.check_respond=data;
        if(this.check_respond.suc==1){
        this.fetchdata(localStorage.getItem('Inc_id'));
          this.toastr.successToastr('Call Log deleted successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
          }
          else{
            this.toastr.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
          }
      })
    }
    getIncDetails(_e:IncDetails){
        console.log(_e);
             this.fetchdata(_e.id);
    }
}
