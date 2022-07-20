import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IncDetails } from 'src/app/Model/IncDetails';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() incDetails = new EventEmitter<IncDetails>();
  _c_pass:boolean = true;
  _n_pass:boolean = true;
  _o_pass:boolean = true;

  @ViewChild('LogForm') LogForm!:NgForm;
  @ViewChild('logForm') profile!:NgForm;
  @Input() headername!:string;
  @Input() icon!:string;
  get_incident_details:any=[];
  Inc_Name:any='';
  active_flag:any=localStorage.getItem('active_flag');
  Inc_location:any= '';
  tier:any='';
  hours:any='';
  name:any;
  email:any;
  Inc_type:any;
  user_type:any=localStorage.getItem('User_type');
  Emp_id:any=localStorage.getItem('Employee_id');
  get_profile:any=[];
  get_department:any=[];
  get_position:any=[];
  check_response:any;
  File:any='';
  url=global_url_test.URL;
  image:any='';
  user_status:any;
  img_src:any;
  tot_casualty:any;
  hidden = false;
  constructor(private router:Router,private  emergencyservice:VirtualEmergencyService,private toastr:ToastrManager) {
    this.name=localStorage.getItem('Emp_name');
    this.email=localStorage.getItem('Email');
    this.getactiveIncident()
   }

  getactiveIncident(){
    this.emergencyservice.global_service('0','/get_active_inc',null).pipe(map((x:any) => x.msg)).subscribe((data:any)=>{
      // console.log(data);

      var local = localStorage.getItem('_local_set_val');
      if(data.length > 1){
        if(Number(local)>0){

        }
        else{
          this.Inc_Name = data[data.length -1].inc_name+" ("+data[data.length -1].inc_no +")";
          this.Inc_location=data[data.length -1].offshore_name+" ("+data[data.length -1].lat+" : "+data[data.length -1].lon+ ")";
           this.tier=data[data.length -1].tier_type;
          this.hours=data[data.length -1].dif_time;
           this.Inc_type=data[data.length -1].incident_type;
           this.tot_casualty=data[data.length -1].tot_casualty;
           localStorage.setItem('Inc_name',data[data.length -1].inc_name);
          localStorage.setItem('Inc_No',data[data.length -1].inc_no);
          localStorage.setItem('Inc_id',data[data.length -1].id);
          this.incDetails.emit(data[data.length -1]);
        }
      }
      else if(data.length == 1) {
        this.Inc_Name = data[0].inc_name+" ("+data[0].inc_no +")";
        this.Inc_location=data[0].offshore_name+" ("+data[0].lat+" : "+data[0].lon+ ")";
        this.tier=data[0].tier_type;
         this.hours=data[0].dif_time;
          this.Inc_type=data[0].incident_type;
          this.tot_casualty=data[0].tot_casualty;
          localStorage.setItem('Inc_name',data[0].inc_name);
          localStorage.setItem('Inc_No',data[0].inc_no);
          localStorage.setItem('Inc_id',data[0].id);
          this.incDetails.emit(data[0]);
      }
      else{
        localStorage.setItem('Inc_name','' );
        localStorage.setItem('Inc_No','');
        localStorage.setItem('Inc_id','');
      }

    })
  }

  ngOnInit(): void {
     this.get_details();
      //For Getting Department
      this.emergencyservice.global_service('0','/department',"null").subscribe(data=>{
        // console.log(data);
        this.get_department=data;
        this.get_department=this.get_department.msg;

      })
      //For Getting Position
      this.emergencyservice.global_service('0','/position',"null").subscribe(data=>{
        // console.log(data);
        this.get_position=data;
        this.get_position=this.get_position.msg;
      })
      // For Getting Notification
      // this.emergencyservice.emit('notification', {emp_id:localStorage.getItem('Employee_id')});
      // this.emergencyservice.listen('get_notification').subscribe(data=>{
      //   console.log(data);
      // })
  }
  public logout(){
    var dt={
      id:localStorage.getItem('Employee_id'),
      user:localStorage.getItem('Email')
    }
    localStorage.clear();
    this.emergencyservice.global_service('1','/log_out',dt).subscribe(data=>{
    })
    this.router.navigate(['/login']);
  }
  show_pass(_type:any){
    switch(_type){
      case 'O':this._o_pass =!this._o_pass;break;
      case 'C':this._c_pass =!this._c_pass;break;
      case 'N':this._n_pass =!this._n_pass;break;
      default:break;
    }
  }
  get_details(){
    this.emergencyservice.global_service('0','/employee','flag=A&emp_id='+localStorage.getItem('Employee_id')).subscribe(data=>{
     this.get_profile.length=0;
     this.get_profile=data;
     this.get_profile=this.get_profile.msg;
     this.image= this.get_profile[0].img !='' && this.get_profile[0].img!=null ? this.url+this.get_profile[0].img :'assets/images/no-user.png';
     this.img_src=this.get_profile[0].img !='' && this.get_profile[0].img!=null ? this.url+this.get_profile[0].img : 'assets/images/no-user.png';
     this.user_status=this.get_profile[0].user_status;
     localStorage.removeItem('Emp_name');
     localStorage.setItem('Emp_name',this.get_profile[0].emp_name);
     this.name=localStorage.getItem('Emp_name');
     this.profile.control.patchValue({
       user:this.email,
       emp_id:localStorage.getItem('Employee_id'),
       emp_name:this.get_profile[0].emp_name,
       email:this.email,
       per_cnct_no:this.get_profile[0].personal_cnct_no,
       er_cnct_no:this.get_profile[0].er_cnct_no,
       depart_id:this.get_profile[0].emp_depart_id,
       pos_id:this.get_profile[0].emp_pos_id
     })
    })
  }
  Submit(logform:any){
    this.emergencyservice.global_service('1','/update_info_user',logform).subscribe(data=>{
      this.check_response='';
            this.check_response=data;
            if(this.check_response.suc==1){
              this.toastr.successToastr('Updation successful','',{position:'top-center',animate:'slideFromTop',toastTimeout:5000});
              this.get_details();
            }
            else{
              this.toastr.errorToastr('Something went wrong,please try again later','',{position:'top-center',animate:'slideFromTop',toastTimeout:5000});

            }
    })
  }
  Submit_password(Logform:Form){
    // console.log(LogForm);
    if(this.LogForm.form.value.pass!=this.LogForm.form.value.conf_pass){
      this.toastr.errorToastr('Passwords are not getting matched','',{position:'top-center',animate:'slideFromTop',toastTimeout:5000});
    }
    else{
      this.emergencyservice.global_service('1','/reset_pass',Logform).subscribe(data=>{
        this.check_response='';
        this.check_response=data;
        if(this.check_response.suc==1){
           this.toastr.successToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        }
        else{
          this.toastr.errorToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        }
      })
    }

  }
  // For Changing File
  change_profile(event:any){
    this.File=event.target.files[0];
      const reader = new FileReader();
    reader.onload = () => {
      this.image= reader.result as string;
      this.img_src=reader.result as string;
    }
    reader.readAsDataURL(this.File);
  }
  Edit_profile(){
    var files=document.getElementById('change_file');
    files?.click();
  }
  //click on upload
  saveChanges(){
    const formdata=new FormData();
    formdata.append('user',this.email);
    formdata.append('emp_id',this.Emp_id);
    formdata.append("file",this.File);
    formdata.append("emp_name",this.name);

    this.emergencyservice.global_service('1','/update_pro_pic',formdata).subscribe(data=>{
      this.check_response=data;
      if(this.check_response.suc==1){
        this.get_details();
        this.toastr.successToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
     }
     else{
       this.toastr.errorToastr(this.check_response.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
     }
    })
  }
  //click on remove photo
  remove_profile(){
    this.File='';
    this.image='assets/images/no-user.png';
    this.img_src='assets/images/no-user.png';
  }
  select_mode(mode:any){
  //  $('#activId').inner
    var dt={
      user:this.email,
      emp_id:this.Emp_id,
      emp_name: this.name,
      user_status:mode
    }
   this.emergencyservice.global_service('1','/update_user_status',dt).subscribe(data=>{
    this.check_response=data;
    if(this.check_response.suc==1){
     this.user_status=mode;
    }
    else{

    }

   })
  }
}
