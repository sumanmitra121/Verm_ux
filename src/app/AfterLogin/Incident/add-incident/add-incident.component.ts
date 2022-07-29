import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
import { HeaderComponent } from '../../Common/header/header.component';
declare var $:any;
@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {
  incId!:string;
  @ViewChild('logForm') LogForm!:NgForm;
  headername:any='Incident Module';
  icon:any='fa-database';
  // defaullt_user:any='sumanmitra0096@gmail.com';
  defaullt_user:any=localStorage.getItem('Email');
  get_incident:any=[];
  location:any = [];
  initial_tier:any=[];
  initial_id:any=0;
  status:any='O';
  check_respond:any='';
  y:any;
  response:any='';
  check_active_roaster:any=[];
  check_active:any;
  // dt=global_url_test.get_dt();
  constructor(public dialog:MatDialog,private datePipe:DatePipe,private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager,private spinner:NgxSpinnerService) {
  }
  ngOnInit(): void {
//For Incident names in dropdown
   this.emergencyservice.global_service('0','/incident',null).subscribe(data=>{
     this.get_incident=data;
     this.get_incident=this.get_incident.msg;
   })
   //For getting location in dropdown
   this.emergencyservice.global_service('0','/offshore','flag='+'A').subscribe(data=>{
    this.location=data;
    this.location=this.location.msg;
  })
  //For getting Tier Type in dropdown
  this.emergencyservice.global_service('0','/tier',null).subscribe(data=>{
    this.initial_tier=data;
    this.initial_tier=this.initial_tier.msg;
  })
  // For checking whether a team is in the roaster or not
  this.emergencyservice.global_service('0','/get_active_team',null).subscribe(data=>{
     this.check_active_roaster=data;
     this.check_active_roaster=this.check_active_roaster.msg;
     this.check_active=this.check_active_roaster[0].active_flag;
  })
  }
  logSubmit(Form:Form){
    if(localStorage.getItem('Inc_id')!=''){
      const dialogConfig=new MatDialogConfig();
      dialogConfig.disableClose=false;
      dialogConfig.autoFocus=true;
      dialogConfig.width='30%';
      dialogConfig.data={api_name:'',name:'AddIncident',id:0}

      const dialogref=this.dialog.open(DialogalertComponent,dialogConfig);
      dialogref.afterClosed().subscribe(dt=>{
        console.log(dt);
           if(dt == 1){
              this.AddIncident();
           }

      })

    }
    else{
      this.AddIncident();
    }

 }
 AddIncident(){
 this.spinner.show();
  this.LogForm.form.value.id=0;
  this.LogForm.form.value.user=this.defaullt_user;
  this.LogForm.form.value.inc_status=this.status;
  this.emergencyservice.global_service('1','/create_incident',this.LogForm.form.value).subscribe(data=>{
     this.check_respond=data;
     if(this.check_respond.suc==1){
      this.response="An incident with Id "+ this.check_respond.inc_no+" has been created successfully";
      var dt=global_url_test.get_dt(this.LogForm.form.value.id,'I',this.LogForm.form.value.inc_name,$('#type option:selected').text(),this.LogForm.form.value.user,'IC',this.datePipe.transform(new Date(),'dd/MM/YYYY hh:mma'),this.check_respond.inc_no);
      this.emergencyservice.global_service('1','/post_notification',dt).subscribe(data=>{})
      localStorage.setItem('_local_sel_id','0');
      this.incId = this.check_respond.inc_no;

      this.LogForm.reset();
      this.spinner.hide();
      this.myFunction();
     }
     else{
      this.spinner.hide();
      this.toastr.errorToastr('Insertion Failed','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:20000});
     }
  })
 }

// For snackbar
 myFunction() {
  this.y = document.getElementById("snackbar");
  this.y.className = "snackbar show";
  setTimeout(()=>{ this.y.className = this.y.className.replace("snackbar show", "snackbar"); }, 10000);
}

}
