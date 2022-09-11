import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { NgxSpinnerService } from "ngx-spinner";//For Spinner
import { ToastrManager } from 'ng6-toastr-notifications';//For Toaster
import { map } from 'rxjs/operators';
import { validations } from 'src/app/utilitY/validation';
@Component({
  selector: 'app-add-admin-employee',
  templateUrl: './add-admin-employee.component.html',
  styleUrls: ['./add-admin-employee.component.css']
})
export class AddAdminEmployeeComponent implements OnInit {
  ckeConfig: any;
  roles_responsibility:any='';
  chk_existance:any=[{email:0},{er_contact:1},{p_contact:0},{emp_id:0}];
  @ViewChild('logForm') LogForm!:NgForm;
  get_position:any=[];
  get_department:any=[];
  constructor(private emergencyservice:VirtualEmergencyService,
    private route:Router,private spinner: NgxSpinnerService,
    public toastr: ToastrManager) {
      console.log('sasd')
     }
  status:any='A'
  ngOnInit(): void {
    this.getPosition()
    this.getDepartment();
    this.setConfig();
  }
  setConfig(){
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };
  }

  cancel(){
   this.LogForm.form.patchValue({
      id:'0',
      user: localStorage.getItem('Email'),
      employee_id:'',
      name:'',
      department:'',
      position:'',
      email:'',
      p_contact:'',
      er_contact:'',
      emp_status:'A',
      user_type:'',
      approval_flag:'',
      user_role:''
   })
   this.roles_responsibility = '';
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    if(this.chk_existance[0].email == 0 || this.chk_existance[1].er_contact == 0 ||
      this.chk_existance[2].p_contact == 0 || this.chk_existance[3].emp_id == 0)
      {
        this.spinner.hide();
        this.toastr.errorToastr((this.chk_existance[0].email == 0 ? 'Email' : this.chk_existance[1].er_contact == 0 ? 'Er contact number' :
        this.chk_existance[2].p_contact == 0 ? 'Personal contact number' : 'Employee id') + " already in use" , '',{position:'bottom-right',animate:'slideFromRight',toastTimeout:10000});
      }
    else{
      this.emergencyservice.global_service('1','/employee',logForm).subscribe((data:any)=>{
        if(data.suc==1){
        this.spinner.hide();
         this.route.navigate(['/admin/employee']).then(()=>{
          this.toastr.successToastr('Employee Added Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
         });
        }
        else{
        this.spinner.hide();
          this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        }

      })
    }


    }
//checking existance of contact number
 chk_contact_no(event:any,mode:any){
      if(mode=='P'){
       this.emergencyservice.global_service('0','/check_contact_personal','no='+event.target.value).subscribe((data:any)=>{
        this.chk_existance[2].p_contact = data.suc;
         if(data.suc==1){}
         else{this.toastr.errorToastr("Personal contact no is already in use",'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})}})
      }
      else{
        if(event.target.value!=''){
          this.emergencyservice.global_service('0','/check_contact_er','no='+event.target.value).subscribe((data:any)=>{
            this.chk_existance[1].er_contact = data.suc;
            if(data.suc==1){}
            else{
            this.toastr.errorToastr("ER contact no is already in use",'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:4000})
            }
          })
        }
        else{
          this.chk_existance[1].er_contact = 1;

        }

      }

 }
//checking existance of employee id
 check_EmployeeId(_e:any){
   if(_e.target.value!=''){
    this.emergencyservice.global_service('0','/chk_emp_id','emp_id='+ _e.target.value).subscribe((data:any)=>{
    this.chk_existance[3].emp_id = data.suc;
    if(data.suc==1){}
    else{
      this.toastr.errorToastr(data.msg, '',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});}})
    }
 }
//checking existance of email
 check_Email(_e:any){
   if(_e!=''){
    this.emergencyservice.global_service('0','/chk_email','email='+ _e.target.value).subscribe((data:any)=>{
      this.chk_existance[0].email= data.suc;
      if(data.suc==1){}
      else{this.toastr.errorToastr(data.msg, '',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});}
    })
   }
 }
//For Department select dropdown
 getDepartment(){
   this.emergencyservice.global_service('0','/department',"null").pipe(map((x:any)=> x.msg)).subscribe(data=>{this.get_department=data;})
  }
//For Position select dropdown
 getPosition(){
   this.emergencyservice.global_service('0','/position',"null").pipe(map((x:any)=> x.msg)).subscribe(data=>{this.get_position=data;})
  }
 ngAfterViewInit(){
  setTimeout(()=>{
    this.LogForm.form.patchValue({
      id:'0',
      user: localStorage.getItem('Email')
   })
  },100)
 }
 checked_radio(_e:any){
   if(this.LogForm.form.value.user_type=='I' || this.LogForm.form.value.user_type=='A'){
      this.LogForm.form.patchValue({
        approval_flag : 'Y'
      })
   }
   else{
    this.LogForm.form.patchValue({
      approval_flag : ''
    })
   }
 }
 PreventNonNumeric(_event: any) {
  validations._preventnonNumeric(_event);
}

}
