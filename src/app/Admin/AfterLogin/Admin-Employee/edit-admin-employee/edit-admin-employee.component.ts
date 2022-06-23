import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-edit-admin-employee',
  templateUrl: './edit-admin-employee.component.html',
  styleUrls: ['./edit-admin-employee.component.css']
})
export class EditAdminEmployeeComponent implements OnInit {
   status:any='A';
   @ViewChild('logForm') LogForm!:NgForm;
   chk_response:any='';
  constructor(private emergencyservice:VirtualEmergencyService,private activatedroute:ActivatedRoute,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }
  id:any;
  get_position:any=[];
  get_department:any=[];
  get_employee_details:any;
  check_response:any;
  chk_contact_personal:boolean=true;
  chk_contact_ER:boolean=true;
  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.params['id'];
    var data='id='+this.id;
   //For Position select dropdown
   this.emergencyservice.global_service('0','/position',"null").subscribe(data=>{
    //  console.log(data);
    this.get_position=data;
    this.get_position=this.get_position.msg;
   })
   //For Department select dropdown
   this.emergencyservice.global_service('0','/department',"null").subscribe(data=>{
    // console.log(data);
     this.get_department=data;
     this.get_department=this.get_department.msg;
  })
  //For setting  fields with value 
    this.emergencyservice.global_service('0','/employee',data).subscribe(data=>{
      console.log(data);
    this.get_employee_details=data;
    this.get_employee_details=this.get_employee_details.msg;
    this.LogForm.setValue({
      id:this.id,
      // user:'admin@gmail.com',
      user:localStorage.getItem('Email'),
      employee_id:this.get_employee_details[0].employee_id,
      name:this.get_employee_details[0].emp_name,
      department:this.get_employee_details[0].emp_depart_id,
      position:this.get_employee_details[0].emp_pos_id,
      email:this.get_employee_details[0].email,
      p_contact:this.get_employee_details[0].personal_cnct_no,
      er_contact:this.get_employee_details[0].er_cnct_no,
      emp_status:this.get_employee_details[0].emp_status,
      user_type:this.get_employee_details[0].user_type,
      approval_flag:this.get_employee_details[0].approval_flag
    })
  })
  //For select dropdown for User Type
    // $('#User_type').on('change',()=>{
    //   console.log(this.LogForm.form.value.user_type);
    //   if(this.LogForm.form.value.user_type=='I' || this.LogForm.form.value.user_type=='A'){
    //   this.LogForm.form.value.approval_flag='Y';
    //   $('#yes').prop("checked",true);
    //   $('#submit_logForm').attr('disabled',false);
    // }
    // else{
    //   $('#yes').prop("checked",false);
    //   $('#no').prop("checked",false); 
    //   $('#submit_logForm').attr('disabled',true);
    //   this.LogForm.form.value.approval_flag='';
    // }
    // })
    // $('input[type=radio][name=approval_flag]').change(()=> {
    //   if(this.LogForm.form.status=='VALID'){
    //   $('#submit_logForm').attr('disabled',false);}
    //   else{
    //     $('#submit_logForm').attr('disabled',true);
    //   }
    // })

    $(document).ready(()=>{
      //For checking existance of email
      // $('#Email').change(()=>{
      //   this.emergencyservice.global_service('0','/chk_email','email='+ $('#Email').val()) .subscribe(data=>{
      //     console.log(data);
      //     this.check_response=data;
      //     if(this.check_response.suc==1){
      //     }
      //     else{
      //      this.toastr.errorToastr(this.check_response.msg, 'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      //     } 
          
      //   })
      //  })
     //For checking existance of employee id
    //  $('#emp_id').change(()=>{
    //    this.emergencyservice.global_service('0','/chk_emp_id','emp_id='+ $('#emp_id').val()) .subscribe(data=>{
    //      console.log(data);
    //      this.check_response=data;
    //      if(this.check_response.suc==1){
    //        //Proceed
    //      }
    //      else{
     
    //        this.toastr.errorToastr(this.check_response.msg, 'Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
    //        } 
         
    //    })
    //  })
     //For select dropdown for User Type
     $('#User_type').on('change',()=>{
       // console.log(this.LogForm.form.value.user_type);
     if(this.LogForm.form.value.user_type=='I' || this.LogForm.form.value.user_type=='A'){
       this.LogForm.form.value.approval_flag='Y';
       $('#yes').prop("checked",true);
       $('#submit').attr('disabled',false);
     }
     else{
       $('#yes').prop("checked",false);
       $('#no').prop("checked",false); 
       $('#submit').attr('disabled',true);
       this.LogForm.form.value.approval_flag='';
     }
     })
   
     $('input[type=radio][name=approval_flag]').change(()=> {
       if(this.LogForm.form.status=='VALID'){
       $('#submit').attr('disabled',false);}
       else{
         $('#submit').attr('disabled',true);
       }
     })
      })
  
  }
  logSubmit(logForm:Form){
    // console.log(logForm);
    this.spinner.show();
    this.emergencyservice.global_service('1','/employee',logForm).subscribe(data=>{console.log(data);
      this.check_response=data;
      if(this.check_response.suc==1){
        this.spinner.hide();
      this.route.navigate(['/admin/employee']).then(()=>{
        this.toastr.successToastr('Employee Updated Successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
      });
      }
      else{
        this.spinner.hide();
        this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});

      }
    
    
    })
    
    }

    chk_contact_no(event:any,mode:any){
 
      // this.chk_response='';
      //     if(mode=='P'){
      //      this.emergencyservice.global_service('0','/check_contact_personal','no='+event.target.value).subscribe(data=>{
      //        console.log(data);
      //        this.chk_response=data;
      //        if(this.chk_response.suc==1){
      //            this.chk_contact_personal=false;
      //        }
      //        else{
      //         this.chk_contact_personal=true;
      //         this.toastr.errorToastr("This no is already in use",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
      //        }
             
      //      })
      //     }
      //     else{
      //       this.emergencyservice.global_service('0','/check_contact_er','no='+event.target.value).subscribe(data=>{
      //         console.log(data);
      //         this.chk_response=data;
      //         if(this.chk_response.suc==1){
      //             this.chk_contact_ER=false;
      //         }
      //         else{
      //          this.chk_contact_ER=true;
      //         this.toastr.errorToastr("This no is already in use",'',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
      //         }
              
      //       })
      //     }
     }
    

}
