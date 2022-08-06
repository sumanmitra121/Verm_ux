import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map } from 'rxjs/operators';
import { IncDetails } from 'src/app/Model/IncDetails';
import { Notifiactions } from 'src/app/Model/Notifiactions';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  _initial_tier_id:any;
  @Output() incDetails = new EventEmitter<IncDetails>();
  _c_pass:boolean = true;
  _n_pass:boolean = true;
  _o_pass:boolean = true;
  _max_id!:any;
  localStorageAlice = localStorage;
  @Input() IncID!:string;
  @Output() IncStatus= new EventEmitter<IncDetails>();
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
  // _ActiveIncNum:any=0;
  _activeInc:any=[];
  _activeIncBackup:any=[]
  _selected_Inc:any='';
  _notification:Notifiactions[]=[];
  hidden = false;
  _TOTAL_LENGTH_NOTIFICATION:any;

  constructor(private router:Router,private  emergencyservice:VirtualEmergencyService,private toastr:ToastrManager) {
    this.name=localStorage.getItem('Emp_name');
    this.email=localStorage.getItem('Email');
   }
   getCurrentIncident(){

    this._activeInc.length=0;
    this._activeIncBackup.length = 0;
      this.emergencyservice.global_service('0','/get_active_inc',null).pipe(map((x:any) => x.msg)).subscribe((data:any)=>{
        this._activeIncBackup = data;
        if(data.length > 1){
        var local_sel_id = Number(localStorage.getItem('_local_sel_id'));
          if(local_sel_id > 0){
                 this.getDetails(Number(localStorage.getItem('Inc_No')))
          }else{
            var dt = data.sort((a:any, b:any) => (a.id < b.id ? -1 : 1));//for sorting incident by their Id
            this.getDetails(Number(dt[dt.length-1].inc_no))
          }
        }else if(data.length == 1){
            this.getDetails(Number(data[0].inc_no))
        }
        else{
          this.Inc_Name = '';
          this.Inc_location='';
          this.tier='';
          this.hours='';
          this.Inc_type='';
          this.tot_casualty='';
          this._selected_Inc = '';
          localStorage.setItem('Inc_name','');
          localStorage.setItem('Inc_No','');
          localStorage.setItem('Inc_id','');
        }
      })

      //For Getting notifications
  }

  ngOnInit() {
    this.getCurrentIncident()

     this.get_details();
      //For Getting Department
      this.emergencyservice.global_service('0','/department',"null").subscribe(data=>{
        this.get_department=data;
        this.get_department=this.get_department.msg;

      })
      //For Getting Position
      this.emergencyservice.global_service('0','/position',"null").subscribe(data=>{
        // //(data);
        this.get_position=data;
        this.get_position=this.get_position.msg;
      })
      this.getNotifications();
  }

 getNotifications(){
     //call Notification if this member is activated against this team;
      if(localStorage.getItem('active_flag') == '0'){}
      else{
        this.emergencyservice.emit('notification','');
        this.emergencyservice.listen('notification').subscribe((data:any)=>{
           //.log(data)
           this._notification =  data;
           this._TOTAL_LENGTH_NOTIFICATION = this._notification[this._notification.length-1].total;
           //.log(this._TOTAL_LENGTH_NOTIFICATION);

        })
      }
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
    // //(LogForm);
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

  active_incident(_inc_name:any,_inc_no:any,_inc_id:any){
    this._activeInc.length =0;
    localStorage.setItem('_local_sel_id','1');
     this._selected_Inc = _inc_name+ '('+_inc_no+')';
     this._activeInc = this._activeIncBackup.filter((x:any) => x.inc_no != _inc_no);
     this.getDetails(Number(_inc_no));
      // this.IncStatus.emit(this._activeIncBackup.filter((x:any) => x.inc_no == _inc_no)[0]);
  }

  getDetails(_inc_no:number){
    var incStatus = this._activeIncBackup.find((x:any) => x.inc_no == _inc_no);
   console.log(incStatus);

    this.Inc_Name = incStatus.inc_name + '(' +incStatus.inc_no +')';
    this._selected_Inc = this.Inc_Name;
    this.Inc_location=incStatus.offshore_name+" ("+incStatus.lat+" : "+incStatus.lon+ ")";
    this._initial_tier_id = incStatus.initial_tier_id
    this.tier=incStatus.tier_type;
    this.hours=incStatus.dif_time;
    this.Inc_type=incStatus.incident_type;
    this.tot_casualty=incStatus.tot_casualty;
    localStorage.setItem('Inc_name',incStatus.inc_name);
    localStorage.setItem('Inc_No',incStatus.inc_no);
    localStorage.setItem('Inc_id',incStatus.id);
    this.IncStatus.emit(incStatus);
    this._activeInc = this._activeIncBackup.filter((x:any) => x.id != localStorage.getItem('Inc_id'));
    //For Getting Current Incident As the cuurent incident has the latest Id;
    this._max_id = this._activeIncBackup.reduce((prev:any, current:any) => (+prev.id > +current.id) ? prev : current);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getNotifications();

    if(changes?.IncID?.currentValue){
      this.getCurrentIncident();
    }
}
gotoNotifications(_id:any,_activity:any){
  //og(_id)
  if(_activity !== 'D'){
    this.emergencyservice.clearNotifications(_id,_activity);
  }
  else{
    this.router.navigate(['/notifications',btoa(_activity)]);
  }
}
}
