import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-edit-admin-team',
  templateUrl: './edit-admin-team.component.html',
  styleUrls: ['./edit-admin-team.component.css']
})
export class EditAdminTeamComponent implements OnInit {
  @ViewChild('logForm') LogForm!:NgForm;
  get_team_details:any;
  check_response:any;
  id:any;
  get_teams:any=[];
  constructor(private emergencyservice:VirtualEmergencyService,private activatedroute:ActivatedRoute,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    // if('update-team' in localStorage){localStorage.removeItem('update-team');}
    // if('add-team' in localStorage){localStorage.removeItem('add-team');}
    this.id=this.activatedroute.snapshot.params['id'];
    var data='id='+this.id;
    //For getting  team type in dropdown
    this.emergencyservice.global_service('0','/team_type','null').subscribe(data=>{
      // console.log(data);
       this.get_teams=data;
       this.get_teams=this.get_teams.msg;
    })
   //For filling the input field with some predifined data.
    this.emergencyservice.global_service('0','/teams',data).subscribe(data=>{
      // console.log(data);
    this.get_team_details=data;
    this.get_team_details=this.get_team_details.msg;
    this.LogForm.setValue({
      id:this.id,
      user:localStorage.getItem('Email'),
      team_type:this.get_team_details[0].team_type_id,
      team_name:this.get_team_details[0].team_name
    })
  })
  }
  logSubmit(logForm:Form){
    // console.log(logForm); 
    this.spinner.show();
    this.emergencyservice.global_service('1','/teams',logForm).subscribe(data=>{
      this.check_response=data;
      if(this.check_response.suc==1){
      // localStorage.setItem('update-team','1'); 
      this.spinner.hide();
      this.route.navigate(['/admin/team']).then(()=>{
        this.toastr.successToastr('Team Updated Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
      })
      }
      else{
      this.spinner.hide();
        // Error Message
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});

      }
    })
  }

}
