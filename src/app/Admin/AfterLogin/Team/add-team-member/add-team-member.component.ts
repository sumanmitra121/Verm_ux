import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Form, NgForm } from '@angular/forms';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;

  Flag:any='flag='+ 'A';
  Employee:any=[];
  team_name:any=[];
  selected_member:any= [];
  All_Employee:any= [];
  emp_list:any=[];
  get_employee:any=[];
  check_respond:any;
 default_user:any=localStorage.getItem('Email');
 check_data:any;
  count:any=0;
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('edit-assign' in localStorage){localStorage.removeItem('edit-assign');}
    // if('add-assign' in localStorage){localStorage.removeItem('add-assign');}
    //For select teams in dropdown
    this.emergencyservice.global_service('0','/teams',"null").subscribe(data=>{
      // console.log(data);
      this.team_name=data;
      this.team_name=this.team_name.msg;
    })
    //For listing all Employee Name
    this.emergencyservice.global_service('0','/get_emp_list',null).subscribe(data=>{
      console.log(data);
      this.Employee.length=0;
      this.Employee=data;
      this.Employee=this.Employee.msg;
      for(let i=0;i<this.Employee.length;i++){
        if(this.Employee[i].assign_status!="Assigned"){
        this.Employee[i].user_type = this.Employee[i].user_type == 'M' ? 'Approver' : (this.Employee[i].user_type == 'I' ? 'IC' : (this.Employee[i].user_type == 'A' ? 'Admin' : 'User'));
        this.All_Employee.push({id:this.Employee[i].emp_id,emp_id:this.Employee[i].employee_id,emp_name:this.Employee[i].emp_name,emp_status:this.Employee[i].assign_status,user_type:this.Employee[i].user_type})
      }
    }
      // console.log(this.All_Employee);
    })
    //For selecting Employee based on team name
    $('#Team_id').on('change',()=>{
      console.log($('#Team_id').val());
      var dt=$('#Team_id').val()
      this.emergencyservice.global_service('0','/assign_team','id=' +dt).subscribe(data=>{
        console.log(data);
        this.get_employee.length=0;
        this.selected_member.length=0;
         this.get_employee=data;
         this.get_employee=this.get_employee.msg;
         if(this.get_employee.length>0){
          for(let i=0;i<this.get_employee.length;i++){
        this.get_employee[i].user_type = this.get_employee[i].user_type == 'M' ? 'Approver' : (this.get_employee[i].user_type == 'I' ? 'IC' : (this.get_employee[i].user_type == 'A' ? 'Admin' : 'User'));
            this.selected_member.push({id:this.get_employee[i].emp_id,emp_name:this.get_employee[i].emp_name,emp_id:this.get_employee[i].employee_id,user_type:this.get_employee[i].user_type,emp_status:this.Employee[i].assign_status});
           console.log(this.get_employee.length);

          }
         }
         else{
          this.selected_member.length=0;
         console.log(this.get_employee.length);

         }
         
      })
    })
    
  }
  drop(event: CdkDragDrop<any[]>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log( moveItemInArray);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(transferArrayItem);

    }
    console.log(this.selected_member);

  }
  selectall(pack:any){
    if(pack=='todo'){
    if(this.All_Employee.length==0 ){
  for(let i=0;i<this.selected_member.length;i++){
      this.All_Employee.push({id:this.selected_member[i].id,emp_name:this.selected_member[i].emp_name,emp_id:this.selected_member[i].emp_id,emp_status:this.selected_member[i].emp_status,user_type:this.selected_member[i].user_type})
    }
  }
  else{
    for(let i=0;i<this.selected_member.length;i++){
      this.All_Employee.push({id:this.selected_member[i].id,emp_name:this.selected_member[i].emp_name,emp_id:this.selected_member[i].emp_id,emp_status:this.selected_member[i].emp_status,user_type:this.selected_member[i].user_type})
    }
  }
  this.selected_member.length=0;
  console.log(this.All_Employee,this.selected_member);
   }
  else{
    if(this.selected_member.length==0 ){
    for(let i=0;i<this.All_Employee.length;i++){
        this.selected_member.push({id:this.All_Employee[i].id,emp_name:this.All_Employee[i].emp_name,emp_id:this.All_Employee[i].emp_id,user_type:this.All_Employee[i].user_type,emp_status:this.All_Employee[i].emp_status})
      }
    }
    else{
      for(let i=0;i<this.All_Employee.length;i++){
        this.selected_member.push({id:this.All_Employee[i].id,emp_name:this.All_Employee[i].emp_name,emp_id:this.All_Employee[i].emp_id,user_type:this.All_Employee[i].user_type,emp_status:this.All_Employee[i].emp_status})
      }
    }
    this.All_Employee.length=0;
    console.log(this.All_Employee,this.selected_member);
   }
  }
  logSubmit(logForm:Form){
    this.count=0;
    this.spinner.show();
    this.emp_list.length=0;
    var team_name=$('#Team_id :selected').text();
   for(let i=0;i<this.selected_member.length;i++){
     if(this.selected_member[i].user_type=='IC'){
       this.count=this.count+1;
     }
     this.emp_list.push({emp_name:this.selected_member[i].emp_name,id:this.selected_member[i].id,emp_id:this.selected_member[i].emp_id,emp_status:'O',team_name:team_name});
   }
  this.LogForm.value.emp_list=this.emp_list;
  if(this.LogForm.form.value.team_id==''){
    this.spinner.hide();
     this.toastr.errorToastr('Please Select Team','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
  }
  else{
    if(this.count > 0){
    this.emergencyservice.global_service('1','/assign_team',logForm).subscribe(data=>{
    this.check_respond=data;
    if(this.check_respond.suc==1){
      this.spinner.hide();
      this.router.navigate(['/admin/Team/assignteam']).then(()=>{
        this.toastr.successToastr('Team Submition Successful','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      });
    }
    else{
      this.spinner.hide();
      this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    }
     })      
    }
    else{
      this.spinner.hide();
      this.toastr.errorToastr('This team has no Incident Commandar','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    }
  }
}
}
 