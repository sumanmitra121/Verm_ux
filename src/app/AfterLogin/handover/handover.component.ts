import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import {map } from 'rxjs/operators';
import { IncDetails } from 'src/app/Model/IncDetails';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-handover',
  templateUrl: './handover.component.html',
  styleUrls: ['./handover.component.css']
})
export class HandoverComponent implements OnInit {
  handoverform!:FormGroup;
  _ACTIVE_FLAG:any = localStorage.getItem('active_flag');
  constructor(private router:Router,private spinner:NgxSpinnerService,private fb:FormBuilder,private emergency: VirtualEmergencyService,private toastr:ToastrManager) { }
  TO_TEAM:any=[];
  ngOnInit(): void {
    this.spinner.show();
    this.handoverform = this.fb.group({
      inc:[''],
      header:['',Validators.required],
      remarks:['',Validators.required],
      from_team:[],
      from_team_id:[''],
      user:[localStorage.getItem('Email')],
      emp_id:[localStorage.getItem('_emp_id')],
      to_team_id:[0],
      inc_id:[localStorage.getItem('Inc_id')],
      emp_name:[localStorage.getItem('Emp_name')],
      inc_no:[localStorage.getItem('Inc_No')]
    })
    this.getTeam_id();
  }
  HandOver(){
    this.spinner.show();
    if(this.handoverform.get('to_team_id')?.value > 0){
      this.emergency.global_service('1','/handover',this.handoverform.value).subscribe((res:any) =>{
        if(res.suc > 0){
          var dt={
            inc_id:localStorage.getItem('Inc_id')!='' ? localStorage.getItem('Inc_id'):'',
            team_id:this.handoverform.get('to_team_id')?.value,
            team_name:this.TO_TEAM.find((x:any) => x.team_id == this.handoverform.get('to_team_id')?.value).team_name,
            inc_name:localStorage.getItem('Inc_name')!='' ? localStorage.getItem('Inc_name') : '',
            user:localStorage.getItem('Email'),
            flag:'Y'
          }
      this.emergency.global_service('1','/activation_team',dt).subscribe((data:any)=>{
            if(data.suc > 0){
              this.spinner.hide();
              this.router.navigate(['/ActivationModule']).then(()=>{
                this.toastr.successToastr('HandOver Successfull','',{position:'top-right',animate:'slideFromRight',toastTimeout:10000});
              })
            }
            else{
              this.spinner.hide();

              this.toastr.errorToastr('HandOver failed','',{position:'top-right',animate:'slideFromRight',toastTimeout:10000});
            }
        //  this.spinner.hide();
      })
        }else{
        this.spinner.hide();
          this.toastr.errorToastr('HandOver failed','',{position:'top-right',animate:'slideFromRight',toastTimeout:10000});
        }
})
    }
    else{
      this.emergency.global_service('1','/handover',this.handoverform.value).subscribe((res:any) =>{
                if(res.suc > 0){
                   this.router.navigate(['/ActivationModule']);
                    this.toastr.successToastr('HandOver Successfull','',{position:'top-right',animate:'slideFromRight',toastTimeout:10000});
                }else{
                  this.toastr.errorToastr('HandOver failed','',{position:'top-right',animate:'slideFromRight',toastTimeout:10000});
                }
              this.spinner.hide();
          })
    }
  }
  getTeam_id(){
    this.emergency.global_service('0','/get_assigned_team','emp_id='+localStorage.getItem('_emp_id')).pipe(map((x:any)=> x.msg)).subscribe(res =>{
      this.handoverform.get('from_team_id')?.setValue(res.length > 0 ? res[0].team_id : 0);
      this.handoverform.get('from_team')?.setValue(res.length > 0 ? res[0].team_name : '');
       this.getTeam();
    })
  }
  getTeam(){
      this.emergency.global_service('0','/get_active_emp_list','flag=A').pipe(map((x:any)=> x.msg)).subscribe(data=>{
        console.log(data);
        if(data.length > 1){
        for(let i=0;i<(data.length -1) ;i++){
          if(data[i]!=null && data[i].team_id != this.handoverform.get('from_team_id')?.value){
            this.TO_TEAM.push(data[i])
          }
        }
      }
      this.spinner.hide();

    });
  }
  getIncDetails(_event:any){
    console.log(_event);
    setTimeout(() => {
    this.handoverform.get('inc')?.setValue(_event?.inc_name +' - '+ _event.inc_no);
    }, 100);
  }
}
