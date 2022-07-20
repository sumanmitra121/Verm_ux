import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { NgxSpinnerService } from "ngx-spinner";//For Spinner
import { ToastrManager } from 'ng6-toastr-notifications';//For Toaster
declare var $:any;
@Component({
  selector: 'app-add-admin-employee',
  templateUrl: './add-admin-employee.component.html',
  styleUrls: ['./add-admin-employee.component.css']
})
export class AddAdminEmployeeComponent implements OnInit {
 @ViewChild('logForm') LogForm!:NgForm;
  default_value:any='0';
  default_user:any=localStorage.getItem('Email');
  check_response:any;
  get_position:any=[];
  get_department:any=[];
  chk_response:any='';
  chk_contact_personal:boolean=true;
  chk_contact_ER:boolean=true;

  constructor(private emergencyservice:VirtualEmergencyService,private route:Router,private spinner: NgxSpinnerService,public toastr: ToastrManager) { }
  status:any='A'
  ngOnInit(): void {
    if('update-employee' in localStorage){localStorage.removeItem('update-employee');}
    if('add-employee' in localStorage){localStorage.removeItem('add-employee');}
    //For Position select dropdown
    this.emergencyservice.global_service('0','/position',"null").subscribe(data=>{console.log(data);
      this.get_position=data;
      this.get_position=this.get_position.msg;
     })
     //For Department select dropdown
     this.emergencyservice.global_service('0','/department',"null").subscribe(data=>{
      console.log(data);
       this.get_department=data;
       this.get_department=this.get_department.msg;
    })
    $(document).ready(()=>{
    //For checking existance of email
    $('#Email').change(()=>{
      this.emergencyservice.global_service('0','/chk_email','email='+ $('#Email').val()) .subscribe(data=>{
        console.log(data);
        this.check_response=data;
        if(this.check_response.suc==1){
        }
        else{
         this.toastr.errorToastr(this.check_response.msg, 'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        } 
        
      })
     })
   //For checking existance of employee id
   $('#emp_id').change(()=>{
     this.emergencyservice.global_service('0','/chk_emp_id','emp_id='+ $('#emp_id').val()) .subscribe(data=>{
       console.log(data);
       this.check_response=data;
       if(this.check_response.suc==1){
         //Proceed
       }
       else{
   
         this.toastr.errorToastr(this.check_response.msg, 'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
         } 
       
     })
   })
   //For select dropdown for User Type
   $('#User_type').on('change',()=>{
     // console.log(this.LogForm.form.value.user_type);
   if(this.LogForm.form.value.user_type=='I' || this.LogForm.form.value.user_type=='A'){
     this.LogForm.form.value.approval_flag='Y';
     $('#yes').prop("checked",true);
     // $('#no').removeAttr('checked');
     $('#submit_logForm').attr('disabled',false);
   }
   else{
     $('#yes').prop("checked",false);
     $('#no').prop("checked",false); 
     $('#submit_logForm').attr('disabled',true);
     this.LogForm.form.value.approval_flag='';
   }
   })
 
   $('input[type=radio][name=approval_flag]').change(()=> {
     if(this.LogForm.form.status=='VALID'){
     $('#submit_logForm').attr('disabled',false);}
     else{
       $('#submit_logForm').attr('disabled',true);
     }
   })
    })

  }
  logSubmit(logForm:Form){
    
    // console.log(logForm);
    if(this.chk_contact_personal==true || this.chk_contact_ER==true){
      this.toastr.errorToastr('Either Er or Personal contact number is already in use','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    }
    else{
      this.spinner.show();
      this.emergencyservice.global_service('1','/employee',logForm).subscribe(data=>{
        this.check_response=data;
        if(this.check_response.suc==1){
        this.spinner.hide();
      
         this.route.navigate(['/admin/employee']).then(()=>{
          this.toastr.successToastr('Employee Added Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
         });
        }
        else{
        this.spinner.hide();
          this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
        }
          
      })
    }

    }
 chk_contact_no(event:any,mode:any){
 
  this.chk_response='';
      if(mode=='P'){
       this.emergencyservice.global_service('0','/check_contact_personal','no='+event.target.value).subscribe(data=>{
         console.log(data);
         this.chk_response=data;
         if(this.chk_response.suc==1){
             this.chk_contact_personal=false;
         }
         else{
          this.chk_contact_personal=true;
          this.toastr.errorToastr("This no is already in use",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
         }
         
       })
      }
      else{
        this.emergencyservice.global_service('0','/check_contact_er','no='+event.target.value).subscribe(data=>{
          console.log(data);
          this.chk_response=data;
          if(this.chk_response.suc==1){
              this.chk_contact_ER=false;
          }
          else{
           this.chk_contact_ER=true;
          this.toastr.errorToastr("This no is already in use",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
          }
          
        })
      }
 }

}
