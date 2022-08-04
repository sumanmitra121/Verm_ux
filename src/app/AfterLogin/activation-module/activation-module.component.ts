import { ToastrManager } from 'ng6-toastr-notifications';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activation-module',
  templateUrl: './activation-module.component.html',
  styleUrls: ['./activation-module.component.css']
})
export class ActivationModuleComponent implements OnInit {
   //Angular Material Data Table//
   _activated_flag:any
   _u_type:any = localStorage.getItem('User_type')
   _show_alert:boolean=false;
   _checked_active:boolean = false;
   _team_name:any;
   checkBox_color:any='primary'
   selection = new SelectionModel<any>(true, []);
   _is_activeIncident:any= localStorage.getItem('Inc_id');
  displayedColumns: string[] = ['Name', 'employees_no','Action','Status','View'];
  displayedColumns_employee: string[] = ['select','Employee_name','Employee_designation'];
  displayedColumns_history: string[] = ['From_date', 'To_date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  get_employee_roaster:any=[];
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource();
  dataSource_employee_roaster= new MatTableDataSource();
  _team_id:any;
    ///END////
  headername:any='Activation Module';
  icon:any='fa-database';
  approval_flag:any=0;
  team_on_duity_data:any=[];
   check_activity:any;
   _HAND_FLAG:any;
  active_flag:any=localStorage.getItem('active_flag');
  constructor(private emergencyservice:VirtualEmergencyService,private route:Router,
    private toaster:ToastrManager,private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.fetchdata();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort;
  }
  fetchdata(){
    this.spinner.show();
    this.team_on_duity_data.length=0;
    this.emergencyservice.global_service('0','/get_active_emp_list','flag='+this.approval_flag+'&inc_id='+localStorage.getItem('Inc_id')).pipe(map((x:any)=> x.msg)).subscribe(data=>{
      this._HAND_FLAG = data[data.length -1].hand_flag;
      this.team_on_duity_data=data;
    this.check_active_team();
    this.putdata(this.team_on_duity_data);
    this.getTeambyEmployeeId();
  });
  }
  //check_whether_active_or_not_for_two_team_assign_same_range
  check_active_team(){
    this._checked_active = this.team_on_duity_data.find((x:any) => x.active_flag == 'Y') ? true : false;
  }
  putdata(v:any){
    this.dataSource= new MatTableDataSource(v);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.matsort;
   }
   //For filtering of teams on duty or off duty
  check_team_duity(event:any){
  this.approval_flag=event.value;
  if(event.value=='1'){
    this.displayedColumns=['Name', 'employees_no','View'];
    this.displayedColumns_employee= ['Employee_name','Employee_designation'];
  }
  else{
    this.displayedColumns=['Name', 'employees_no','Action','Status','View'];
    this.displayedColumns_employee= ['select','Employee_name','Employee_designation'];
  }
   this.fetchdata();
  }
  //For activate or deactive team
  async team_active_deactive(event:any,team_name:any,team_id:any,index:any,toggleElement:any,active_flag:any){
    // if(localStorage.getItem('Inc_id') != ''){
    // this.spinner.show('slider_'+index);
    // if(this.team_on_duity_data.length == 1){
    // this.spinner.show('slider_'+index);
    // var res={
    //   inc_id:localStorage.getItem('Inc_id')!=''?localStorage.getItem('Inc_id'):'',
    //   team_id:team_id,
    //   team_name:team_name,
    //   inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
    //   user:localStorage.getItem('Email'),
    //   flag:event.checked==true?'Y':'N'
    // }
    // this.active_Team(res,event.checked,team_name,index);
    // }
    // //For Two Team Assign bewtween same date Range
    // else{
    //  if(this._checked_active){
    //   // toggleElement.checked = !event.checked;
    //   // showing alert and uncheck toggle
    //     event.source.checked = !event.checked;//<= this will uncheck the toggle
    //     this._show_alert= false;
    //   }
    //   else{
    //        var res={
    //         inc_id:localStorage.getItem('Inc_id')!=''?localStorage.getItem('Inc_id'):'',
    //         team_id:team_id,
    //         team_name:team_name,
    //         inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
    //         user:localStorage.getItem('Email'),
    //         flag:event.checked==true?'Y':'N'
    //       }
    //       this.active_Team(res,event.checked,team_name,index);
    //     }
    //   }
    // }

    // console.log(event.checked);

    // if(localStorage.getItem('Inc_id') != ''){

    //   if(event.checked && this._checked_active){
    //      this._show_alert= false
    //     //  event.source.checked = !event.checked;
    //       this.fetchdata();
    //       console.log('dddd');
    //   }
    //   else{
    //     if(this.team_on_duity_data.length > 2 && this._HAND_FLAG == 0){
    //           //showing alert and uncheck toggle
    //           event.source.checked = !event.checked;
    //           this._show_alert= false;
    //            this.fetchdata();
    //             console.log('assasaassa');
    //     }
    //     else{
    //       var res={
    //         inc_id:localStorage.getItem('Inc_id')!=''?localStorage.getItem('Inc_id'):'',
    //         team_id:team_id,
    //         team_name:team_name,
    //         inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
    //         user:localStorage.getItem('Email'),
    //         flag:event.checked==true?'Y':'N'
    //       }
    //       this.emergencyservice.global_service('1','/activation_team',res).subscribe(async data=>{
    //         this.check_activity='';
    //         this.check_activity=data;
    //         if(this.check_activity.suc==1){
    //         var msg = event.checked ? 'has activated ' + team_name : 'has de-activated ' + team_name;
    //         var dt={id:'0',activity:'A',narration:localStorage.getItem('Emp_name')+ msg +' at '+new Date().toISOString().substring(0,10),view_flag:'N',inc_no:localStorage.getItem('Inc_No') == '' ? 0 : localStorage.getItem('Inc_No')};
    //         this.push_notfication(dt);
    //         await this.Check_Assign_Team(event.checked,index);
    //         this.spinner.hide('slider_'+index);
    //         }
    //         else{
    //         this.spinner.hide('slider_'+index);
    //         }
    //       })
    //     }
    //   }
    // }
    // else{
    //   this.toaster.errorToastr('No Active Incident Available');
    // }
    if(localStorage.getItem('Inc_id') != ''){
     this.spinner.show('slider_'+index);
        var res={
            inc_id:localStorage.getItem('Inc_id')!=''?localStorage.getItem('Inc_id'):'',
            team_id:team_id,
            team_name:team_name,
            inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
            user:localStorage.getItem('Email'),
            flag:event.checked==true?'Y':'N'
          }
          this.emergencyservice.global_service('1','/activation_team',res).subscribe(async data=>{
            this.check_activity='';
            this.check_activity=data;
            if(this.check_activity.suc==1){
            var msg = event.checked ? 'has activated ' + team_name : 'has de-activated ' + team_name;
            var dt={id:'0',activity:'A',narration:localStorage.getItem('Emp_name')+ msg +' at '+new Date().toISOString().substring(0,10),view_flag:'N',inc_no:localStorage.getItem('Inc_No') == '' ? 0 : localStorage.getItem('Inc_No')};
            this.push_notfication(dt);
            // await this.Check_Assign_Team(event.checked,index);
            this.fetchdata();
            this.spinner.hide('slider_'+index);
            }
            else{
            this.spinner.hide('slider_'+index);
            }
          })
      }
      else{
        this.toaster.errorToastr('There is no active incident','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
      }
  }

  async Check_Assign_Team(checked_Status:any,index:any){
    this.team_on_duity_data[index].active_flag = checked_Status ? 'Y' : 'N';
    this.dataSource.data = this.team_on_duity_data;
    this.dataSource._updateChangeSubscription;
     this.spinner.hide('slider_'+index);
     this._HAND_FLAG = this.dataSource.data.length > 2 ? 0 : 1;
     this._checked_active =  (this.team_on_duity_data[index].active_flag == 'Y' && this.dataSource.data.length > 2) ? true : false;
  }

  active_Team(res:any,checked_status:any,team_name:any,index:any){
    this.emergencyservice.global_service('1','/activation_team',res).subscribe(async data=>{
      this.check_activity='';
      this.check_activity=data;
      if(this.check_activity.suc==1){
      var msg = checked_status ? 'has activated ' + team_name : 'has de-activated ' + team_name;
      var dt={id:'0',activity:'A',narration:localStorage.getItem('Emp_name')+ msg +' at '+new Date().toISOString().substring(0,10),view_flag:'N',inc_no:localStorage.getItem('Inc_No') == '' ? 0 : localStorage.getItem('Inc_No')};
      this.push_notfication(dt);
      await this.Check_Assign_Team(checked_status,index);
      this.spinner.hide('slider_'+index);
      }
      else{
      this.spinner.hide('slider_'+index);
      }
    },error => {this.spinner.hide('slider_'+index);})
  }

  //For FilterData from data table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  show_employee_roaster(team_id:any,states:any){
    this.get_employee_roaster.length=0;
    this._team_id = '';
    if(states=='employee'){
      this._team_id = team_id;
    this.selection.clear();
    this.emergencyservice.global_service('0','/assign_team','id=' +team_id).subscribe(data=>{

      this.get_employee_roaster=data;
      this.get_employee_roaster=this.get_employee_roaster.msg;
      for(let i=0;i<this.get_employee_roaster.length;i++){
        //  this.get_employee_roaster[i].emp_status=this.get_employee_roaster[i].emp_status=='O'?'ON':'OFF';
         this.get_employee_roaster[i].user_type=this.get_employee_roaster[i].user_type=='A'?'Admin':(this.get_employee_roaster[i].user_type=='M'?'Approver':(this.get_employee_roaster[i].user_type=='U'?'User':'Incident Commander'))
      }
      this.putdata_employee(this.get_employee_roaster);
      // this.get_employee_roaster.forEach((element:any) => {

      //  this.selection

      // });
    })
  }
  else{
    this.emergencyservice.global_service('0','/team_status','id=' +team_id).subscribe(data=>{
       this.get_employee_roaster=data;
       this.get_employee_roaster= this.get_employee_roaster.msg;
      this.putdata_employee( this.get_employee_roaster);
    })
  }
  }
  putdata_employee(v:any){
    this.dataSource_employee_roaster=new MatTableDataSource(v);
    this.dataSource_employee_roaster.data.forEach((element:any) =>{
      if(element.active_flag == 'Y'){
        this.selection.toggle(element)
      }
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource_employee_roaster.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource_employee_roaster.data);
    //this.selection);

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  Active_member(){
    if(this._is_activeIncident!= ''){
      if(this.selection.selected.length > 0){
        var res = {
          inc_id:localStorage.getItem('Inc_id')!=''?localStorage.getItem('Inc_id'):'',
          team_id:this._team_id,
          team_name:this.selection.selected[0].team_name,
          inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
          user:localStorage.getItem('Email'),
          flag:'Y',
          emp_dt:this.selection.selected
      }
      this.emergencyservice.global_service('1','/activation ',res).subscribe(data=>{
        this.check_activity='';
        this.check_activity=data;
        if(this.check_activity.suc==1){
          var dt={id:'0',activity:'A',narration:localStorage.getItem('Emp_name')+' has activated '+this._team_name+' at '+new Date().toISOString().substring(0,10),view_flag:'N',inc_no:localStorage.getItem('Inc_No')};
          this.push_notfication(dt);
          this.fetchdata();
          this.toaster.successToastr('Members of '+ this.selection.selected[0].team_name + '  has been successfully activated for ' + localStorage.getItem('Inc_name'));
        }
       })
      }
      else{
        var res1 = {
          inc_id:localStorage.getItem('Inc_id')!=''?localStorage.getItem('Inc_id'):'',
        team_id:this._team_id,
        team_name:this._team_name,
        inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
        user:localStorage.getItem('Email'),
        flag:'N'

        }
        this.emergencyservice.global_service('1','/activation_team',res1).subscribe(data=>{
          this.check_activity='';
          this.check_activity=data;
          if(this.check_activity.suc==1){
          var dt={id:'0',activity:'A',narration:localStorage.getItem('Emp_name')+' has de-activate '+this._team_name+' at '+new Date().toISOString().substring(0,10),view_flag:'N',inc_no:localStorage.getItem('Inc_No')};
          this.push_notfication(dt);
          this.fetchdata();
          this.toaster.successToastr('Team has been de-activated successfully','');
          }
          else{}
        })

      }

    }
    else{
      this.toaster.errorToastr('There is no active incident, you can not active members untill an incident is created');
    }

  }
  getTeamName(team_name:any,active_flag:any){this._team_name =team_name;this._activated_flag = active_flag}
  push_notfication(dt:any){this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{})}
  getTeambyEmployeeId(){
    this.emergencyservice.global_service('0','/get_assigned_team','emp_id='+localStorage.getItem('_emp_id')).pipe(map((x:any)=> x.msg)).subscribe(res =>{
          this._show_alert = this.team_on_duity_data.find((x:any) => x.team_id == res[0].team_id).active_flag == 'Y' ? true : false;
    })
    this.spinner.hide();

  }
}
