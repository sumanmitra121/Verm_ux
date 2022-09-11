import { DatePipe } from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { map } from 'rxjs/operators';
import { global_url_test } from 'src/app/url';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modify-meeting',
  templateUrl: './modify-meeting.component.html',
  styleUrls: ['./modify-meeting.component.css']
})
export class ModifyMeetingComponent implements OnInit {
  _url=global_url_test.URL;
  weeklyForm!:FormGroup;
  team:any=[];
  _file:any='';
   type:any;
  constructor(private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private api_call: VirtualEmergencyService,
    private datePipe: DatePipe,
    private spinner:NgxSpinnerService,
    private router:Router,
    private toastr:ToastrManager) {
      this.type = atob(this.activatedRoute.snapshot.params.type)
      this.fetchTeam()
    this.weeklyForm=this.fb.group({
      id:[Number(atob(this.activatedRoute.snapshot.params.id))],
      inc_id:[localStorage.getItem('Inc_id') != '' ? localStorage.getItem('Inc_id') : 0],
      user:[localStorage.getItem('Email')],
      ref_no:['',Validators.required],
      handover_date:['',Validators.required],
      date:['',Validators.required],
      handover_by:['',Validators.required],
      handover_to:['',Validators.required],
      attended_by:['',Validators.required],
      ongoing_act:['',Validators.required],
      upcoming_act:['',Validators.required],
      logistics:['',Validators.required],
      shore_act:['',Validators.required],
      others:[''],
      file:[''],
      file_path:[''],
      final_flag:['N']
    })
  }
  fetchTeam(){
    this.api_call.global_service('0', '/teams', 'null').pipe(map((x:any) => x.msg)).subscribe(res =>{
       this.team = res;
    })
  }
  ngOnInit(): void {
    //For Editing Purpose
    if(Number((atob(this.activatedRoute.snapshot.params.id))) > 0){
      this.api_call.global_service('0','/meeting','id='+Number((atob(this.activatedRoute.snapshot.params.id)))).pipe(map((x:any) => x.msg)).subscribe(res =>{
       if(res.length > 0){
        atob(this.activatedRoute.snapshot.params.type) =='V'? this.weeklyForm.disable() : '';
        this.weeklyForm.patchValue({
          id:res[0].id,
          inc_id:localStorage.getItem('Inc_id') ? res[0].inc_id : 0,
          user:localStorage.getItem('Email'),
          ref_no:res[0].ref_no,
          handover_date:this.datePipe.transform(res[0].handover_date,'YYYY-MM-ddTHH:mm'),
          date:this.datePipe.transform(res[0].date,'YYYY-MM-ddTHH:mm'),
          handover_by:res[0].handover_by,
          handover_to:res[0].handover_to,
          attended_by:res[0].attended_by,
          ongoing_act:res[0].ongoing_act,
          upcoming_act:res[0].upcoming_act,
          logistics:res[0].logistics,
          shore_act:res[0].shore_act,
          others:res[0].others,
          file:'',
          final_flag:res[0].final_flag,
          file_path:this._url + res[0].file_path
         })
         this._file =res[0].file_path ? this._url + res[0].file_path : '';
       }

      })
    }
    //End
  }
  submit(type:any){
    this.spinner.show();
    const formdata = new FormData();
    formdata.append('id',this.weeklyForm.value.id);
    formdata.append('inc_id',this.weeklyForm.value.inc_id);
    formdata.append('user',this.weeklyForm.value.user);
    formdata.append('ref_no',this.weeklyForm.value.ref_no);
    formdata.append('handover_date',this.weeklyForm.value.handover_date);
    formdata.append('date',this.weeklyForm.value.date);
    formdata.append('handover_by',this.weeklyForm.value.handover_by);
    formdata.append('handover_to',this.weeklyForm.value.handover_to);
    formdata.append('attended_by',this.weeklyForm.value.attended_by);
    formdata.append('ongoing_act',this.weeklyForm.value.ongoing_act);
    formdata.append('upcoming_act',this.weeklyForm.value.upcoming_act);
    formdata.append('logistics',this.weeklyForm.value.logistics);
    formdata.append('shore_act',this.weeklyForm.value.shore_act);
    formdata.append('others',this.weeklyForm.value.others);
    formdata.append('final_flag',type);
    formdata.append('file',this.weeklyForm.value.file_path);
    this.api_call.global_service(1,'/meeting',formdata).subscribe((res:any) =>{
          if(res.suc > 0){
             this.spinner.hide();
              this.toastr.successToastr('Submited Successfully','');
              this.router.navigate(['/meeting']);
          }
          else{
            this.spinner.hide();
             this.toastr.successToastr('Submit not possible','');
          }
    })

  }
  selectFile(event:any){
        if(event.target.files.length > 0){
          if(event.target.files[0].type != 'image/png'
          &&
          event.target.files[0].type != 'image/jpg'
          &&
          event.target.files[0].type != 'image/jpeg'){
             this.toastr.errorToastr('Please Select jpeg or jpg ,png file','');
             this.weeklyForm.patchValue({
              file:null,
              file_path: ''
             })
             this._file = '';
          }
          else{
            this.weeklyForm.patchValue({
              file_path: event.target.files[0]
            })
            var reader = new FileReader();
            reader.onload = () => {
              this._file = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
          }
        }
        else{
          this._file = '';
          this.weeklyForm.patchValue({
            file_path: ''
          })
        }
  }
}
