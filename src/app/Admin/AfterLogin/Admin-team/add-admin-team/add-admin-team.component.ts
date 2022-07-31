import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-add-admin-team',
  templateUrl: './add-admin-team.component.html',
  styleUrls: ['./add-admin-team.component.css']
})
export class AddAdminTeamComponent implements OnInit {
  @ViewChild('logForm') logForm!:NgForm;
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }
   get_teams:any=[];
  ngOnInit(): void {this.getTeam();}

  getTeam(){
    this.emergencyservice.global_service('0','/team_type','null').pipe(map((x:any)=> x.msg)).subscribe(data=>{
       this.get_teams=data;
    })
  }
  logSubmit(logForm:Form){
    this.spinner.show();
     this.emergencyservice.global_service('1','/teams',logForm).subscribe((data:any)=>{
      if(data.suc==1){
        this.spinner.hide();
        this.router.navigate(['/admin/team']).then(()=>{
        this.toastr.successToastr('Team Added Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        })
      }
      else{
        this.spinner.hide();
        //Error Message
        this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
      }
    })
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.logForm.form.patchValue({
        id:0,
        user:localStorage.getItem('Email')
      })
    }, 100);
  }
  cancel(){
    this.logForm.form.patchValue({
      id:0,
      user:localStorage.getItem('Email'),
      Team_name:'',
      team_type:''
    })
  }
}
