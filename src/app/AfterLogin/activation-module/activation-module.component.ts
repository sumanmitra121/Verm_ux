import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
declare var $:any
@Component({
  selector: 'app-activation-module',
  templateUrl: './activation-module.component.html',
  styleUrls: ['./activation-module.component.css']
})
export class ActivationModuleComponent implements OnInit {
   //Angular Material Data Table//
  displayedColumns: string[] = ['Name', 'employees_no','Action','View'];
  displayedColumns_employee: string[] = ['Employee_name','Employee_designation'];
  displayedColumns_history: string[] = ['From_date', 'To_date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  get_employee_roaster:any=[];
  @ViewChild(MatSort) matsort!: MatSort;
  dataSource= new MatTableDataSource();
  dataSource_employee_roaster= new MatTableDataSource();

    ///END////
  temp1:any=[];
  temp:any=[];
  public endorsementIds: string[] = [];
  Row:any=[];
  headername:any='Activation Module';
  icon:any='fa-database';
  approval_flag:any=0;
  team_on_duity_data:any=[];
  team_data:any=[];
  length:any;
   check_activity:any;
   check:any=[];
  active_flag:any=localStorage.getItem('active_flag');
  constructor(private emergencyservice:VirtualEmergencyService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.fetchdata();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matsort;
  }
  fetchdata(){
    this.team_on_duity_data.length=0;
    this.emergencyservice.global_service('0','/get_active_emp_list','flag='+this.approval_flag).subscribe(data=>{
    this.team_on_duity_data=data;
    this.team_on_duity_data=this.team_on_duity_data.msg;
    this.putdata(this.team_on_duity_data);

    // if(this.team_on_duity_data!=''){
    // var frm_dt=this.datePipe.transform(this.team_on_duity_data[0].from_date,'YYYY-MM-dd');
    // var to_dt=this.datePipe.transform(this.team_on_duity_data[0].to_date,'YYYY-MM-dd');
    // this.emergencyservice.global_service('0','/get_active_status','frm_dt='+frm_dt+'&to_dt='+to_dt+'&inc_id='+localStorage.getItem('Inc_id')+'&team_id='+this.team_on_duity_data[0].team_id).subscribe(data=>{
    //   console.log(data);
    //   this.check=data;
    //   this.check=this.check.msg;
    //   for(let i=0;i<this.check.length;i++)
    //   if(this.check[i].active_flag=='N'){
    //       $('#act_'+i).hide();
    //       $('#toggle_'+i).show();
    //   }
    //   else{
    //     $('#act_'+i).show();
    //     $('#act_'+i).removeAttr('hidden');
    //     $('#toggle_'+i).hide();
    //   }
    // })
    // this.putdata(this.team_on_duity_data);
    // }
    // else{

    // }
    });
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
  }
  else{
    this.displayedColumns=['Name', 'employees_no','Action','View'];
  }
   this.fetchdata();
  }
  //For activate or deactive team
  team_active_deactive(event:any,team_name:any,team_id:any,index:any){
    var dt={
      inc_id:localStorage.getItem('Inc_id')!=''?localStorage.getItem('Inc_id'):'',
      team_id:team_id,
      team_name:team_name,
      inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
      user:localStorage.getItem('Email'),
      flag:event.checked==true?'Y':'N'
    }
    this.emergencyservice.global_service('1','/activation ',dt).subscribe(data=>{

      this.check_activity='';
      this.check_activity=data;
      if(this.check_activity.suc==1){
      // $('#act_'+index).show();
      // $('#act_'+index).removeAttr('hidden');
      // $('#toggle_'+index).hide();
      var dt={id:'0',activity:'A',narration:localStorage.getItem('Email')+' has activated '+team_name+' at '+new Date().toISOString().substring(0,10)};
      this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{
      })
      this.fetchdata();
      }
      else{

      }
      })
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
    if(states=='employee'){
    this.emergencyservice.global_service('0','/assign_team','id=' +team_id).subscribe(data=>{
      this.get_employee_roaster=data;
      this.get_employee_roaster=this.get_employee_roaster.msg;
      for(let i=0;i<this.get_employee_roaster.length;i++){
         this.get_employee_roaster[i].emp_status=this.get_employee_roaster[i].emp_status=='O'?'ON':'OFF';
         this.get_employee_roaster[i].user_type=this.get_employee_roaster[i].user_type=='A'?'Admin':(this.get_employee_roaster[i].user_type=='M'?'Approver':(this.get_employee_roaster[i].user_type=='U'?'User':'Incident Commander'))
      }
      this.putdata_employee(this.get_employee_roaster);
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
  }

//   masterToggle() {
//     this.isAllSelected() ?
//         this.selection.clear() :
//         this.dataSource.data.forEach((row:any) =>
//           this.selection.select(row))
//   }

//   logSelection() {
//     this.temp1.length=0;
//     this.temp=this.selection.selected;
//     console.log(this.temp);
//     console.log(this.temp.length,this.selection.selected.length)
//     for(let i=0;i<this.temp.length;i++){
//       this.temp1[i]={id:this.temp[i].id,name:this.temp[i].contact_name}
//     }
//    console.log(this.temp1)
//   }
//  isAllSelected() {
//    const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//  }
}
