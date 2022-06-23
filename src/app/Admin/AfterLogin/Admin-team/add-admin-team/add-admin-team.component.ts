import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-admin-team',
  templateUrl: './add-admin-team.component.html',
  styleUrls: ['./add-admin-team.component.css']
})
export class AddAdminTeamComponent implements OnInit {

  default_value:any=0;
  check_response:any;
  default_user:any=localStorage.getItem('Email');
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }
   get_teams:any=[];
  ngOnInit(): void {
    // if('update-team' in localStorage){localStorage.removeItem('update-team');}
    // if('add-team' in localStorage){localStorage.removeItem('add-team');}
    //For team type dropdwon
    this.emergencyservice.global_service('0','/team_type','null').subscribe(data=>{
      // console.log(data);
       this.get_teams=data;
       this.get_teams=this.get_teams.msg;
    })

  }
  logSubmit(logForm:Form){
    // console.log(logForm); 
    this.spinner.show();
     this.emergencyservice.global_service('1','/teams',logForm).subscribe(data=>{
      // console.log(data);
      this.check_response=data;
      if(this.check_response.suc==1){
        // localStorage.setItem('add-team','1');
        this.spinner.hide();
        this.router.navigate(['/admin/team']).then(()=>{
        this.toastr.successToastr('Team Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        })
      }
      else{ 
        this.spinner.hide();
        //Error Message
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        
      }
      
    })
  }
}
