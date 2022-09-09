import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';
import { VirtualEmergencyService } from './../../../Services/virtual-emergency.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modify-media',
  templateUrl: './modify-media.component.html',
  styleUrls: ['./modify-media.component.css']
})
export class ModifyMediaComponent implements OnInit {
  ROUTEPARAMS = {"id":0,"type":''};
  media!:FormGroup;
  constructor(private routeParams:ActivatedRoute,
    private toastr:ToastrManager,
    private fb:FormBuilder,
    private datePipe:DatePipe,
    private spinner:NgxSpinnerService,
    private router:Router,
    private api_call:VirtualEmergencyService) {
    this.ROUTEPARAMS = {
      "id":Number(atob(this.routeParams.snapshot.params.id)),
      "type": atob(this.routeParams.snapshot.params.type)
    }
    if(atob(this.routeParams.snapshot.params.type) == 'M'){
      this.media = this.fb.group({
        id:[Number(atob(this.routeParams.snapshot.params.id))],
        inc_id:[''],
        inc_no:[localStorage.getItem('Inc_No')],
        user:[localStorage.getItem('Email')],
        description:[''],
        rel_no:[''],
        date:[''],
        time:[''],
        contact_name:[''],
        contact_info:[''],
        location:['']
      })
    }
    else{
      this.media = this.fb.group({
        id:[Number(atob(this.routeParams.snapshot.params.id))],
        inc_id:[''],
        wishers_name:[''],
        user:[localStorage.getItem('Email')],
        inc_no:[localStorage.getItem('Inc_No')],
        description:[''],
        sta_no:[''],
        date:[''],
        time:[''],
        issued_by:[''],
        contact_info:[''],
        location:[''],
        issued_date:[''],
        contact_person:['']
      })
    }
    console.log(this.media);

  }
  ngOnInit(): void {this.setmedia_Control();}
  setmedia_Control(){
    console.log(Number(atob(this.routeParams.snapshot.params.id)));

    if(Number(atob(this.routeParams.snapshot.params.id)) > 0){
      console.log(atob(this.routeParams.snapshot.params.type));
      var api_name = atob(this.routeParams.snapshot.params.type) == 'M' ? '/media_rel' : '/holding';
      this.api_call.global_service(0,api_name,'id='+Number(atob(this.routeParams.snapshot.params.id))).pipe((map((x:any) => x.msg))).subscribe(res =>{
         console.log(res)
        switch(atob(this.routeParams.snapshot.params.type)){
          case "M":this.media.patchValue({
                    id:Number(atob(this.routeParams.snapshot.params.id)),
                    inc_no:localStorage.getItem('Inc_No'),
                    inc_id:res[0].inc_id,
                    user:localStorage.getItem('Email'),
                    rel_no:res[0].rel_no ? res[0].rel_no : '',
                    date:res[0].date  ? this.datePipe.transform(res[0].date,'yyyy-MM-dd') : '',
                    time:res[0].time ? res[0].time : '',
                    contact_name:res[0].contact_name ? res[0].contact_name : '',
                    contact_info:res[0].contact_info ? res[0].contact_info : '',
                    description:res[0].description,
                    location:res[0].location ? res[0].location : ''
                    });
                    break;
          case "H":this.media.patchValue({
                id:Number(atob(this.routeParams.snapshot.params.id)),
                inc_no:localStorage.getItem('Inc_No'),
                inc_id:res[0].inc_id,
                wishers_name:res[0].wishers_name,
                user:localStorage.getItem('Email'),
                sta_no:res[0].sta_no ? res[0].sta_no : '',
                date:res[0].date  ? this.datePipe.transform(res[0].date,'yyyy-MM-dd') : '',
                time:res[0].time ? res[0].time : '',
                issued_by:res[0].issued_by ? res[0].issued_by : '',
                contact_info:res[0].contact_info ? res[0].contact_info : '',
                issued_date:res[0].issued_date ?  this.datePipe.transform(res[0].issued_date,'yyyy-MM-dd') : '',
                contact_person:res[0].contact_person ? res[0].contact_person : '',
                description:res[0].description ? res[0].description : '',
                location:res[0].location ? res[0].location : ''
                });
                break;
          default:break;
        }
      })
     }
  }
  getIncDetails(event:any){
    if(Number(atob(this.routeParams.snapshot.params.id)) == 0){
      this.media.patchValue({
        inc_id:event.id
      })
    }
  }
  submit(mode:any){
  //  this.spinner.show();
   console.log(this.media.value);
   var api_name;
   var msg;
   switch(mode){
    case 'D':
              api_name = this.ROUTEPARAMS.type == 'M' ? '/media_rel' : '/holding';
              msg =  Number(atob(this.routeParams.snapshot.params.id)) > 0 ? 'Updation Successfull' : 'Submited successfully';
              this.submitForm(api_name,msg)
              break;
    case 'F':
              api_name = this.ROUTEPARAMS.type == 'M' ? '/media_rel_final' : '/holding';
               msg = 'Successfully saved as pdf in repository under'+localStorage.getItem('Inc_No')+'folder';
               this.submitForm(api_name,msg);
               break;
    default:break;

   }
  }

  submitForm(api_name:any,msg:any){
    this.api_call.global_service(1,api_name,this.media.value).pipe((map((x:any) => x.suc))).subscribe(res =>{
        this.spinner.hide();
        if(res > 0){
          this.router.navigate(['/media']).then(()=>{
            this.toastr.successToastr(msg,'');
          })
        }
        else{
          this.toastr.errorToastr('Submition Failed','');
        }
    })

  }
}
