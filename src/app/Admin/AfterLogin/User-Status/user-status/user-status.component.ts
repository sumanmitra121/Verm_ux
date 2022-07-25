import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { userStatus } from 'src/app/Model/userStatusSubmit';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import {map} from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  // Material datatable
  displayedColumns: string[] = ['User_Name','Position','Team','Status','mode'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource();
  get_user_status:any=[];
  constructor(private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService,private toastr:ToastrManager) { }

  ngOnInit(): void {
    this.spinner.show();
    this.emergencyservice.listen('user_status').subscribe(data=>{
      console.log(data);
       this.get_user_status=data;
       this.get_user_status=this.get_user_status.users;
        this.putdata(this.get_user_status);
    })
  }

   putdata(user_status:any){
     this.dataSource=new MatTableDataSource(user_status);
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
    select_mode(_mode:any,_u_status:any,_e_id:number,_e_name:any){
          //  console.log(_mode);
    // console.log({"Status":_mode,"Emp_id":_e_id,"_name":_e_name,"changeBy":localStorage.getItem('Email')});
    this.spinner.show();
    const _uStatus = new userStatus();
    _uStatus.user=localStorage.getItem('Email'),
    _uStatus.emp_id=_e_id,
    _uStatus.emp_name = _e_name,
    _uStatus.user_status = _mode
    this.emergencyservice.global_service('1','/update_user_status',_uStatus).pipe(map((x:any) => x.suc)).subscribe(data=>{
      if(data==1){
      //  this.user_status=mode;
       this.toastr.successToastr('Status Change Successfully','');
       this.spinner.hide();
       var _index =this.get_user_status.findIndex((x:any) => x.employee_id == _e_id);
       console.log(_index);
       
       this.get_user_status[_index].user_status = _mode;

      }
      else{
        this.toastr.errorToastr('Failed to change status','');
        this.spinner.hide();
      }
     })
           
    }
}
