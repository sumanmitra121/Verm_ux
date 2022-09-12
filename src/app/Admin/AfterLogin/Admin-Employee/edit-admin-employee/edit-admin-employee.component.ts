import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { validations } from 'src/app/utilitY/validation';
declare var $:any;
@Component({
  selector: 'app-edit-admin-employee',
  templateUrl: './edit-admin-employee.component.html',
  styleUrls: ['./edit-admin-employee.component.css']
})
export class EditAdminEmployeeComponent implements OnInit {
   @ViewChild('logForm') LogForm!:NgForm;
  constructor(private emergencyservice:VirtualEmergencyService,private activatedroute:ActivatedRoute,private route:Router,public toastr:ToastrManager,private spinner:NgxSpinnerService) { }
  id:any;
  get_position:any=[];
  get_department:any=[];
  emp_id:any;
  email:any;
  ckeConfig:any;
  ngOnInit(): void {
    this.spinner.show();
    this.id=this.activatedroute.snapshot.params['id'];
    var data='id='+this.id;
     this.getPosition();
     this.getDepartment();
     this.getEmployeeDetails(data);
     this.setConfig();
  }
  logSubmit(logForm:Form){
    this.spinner.show();
    this.emergencyservice.global_service('1','/employee',logForm).subscribe((data:any)=>{
      if(data.suc==1){
        this.spinner.hide();
      this.route.navigate(['/admin/employee']).then(()=>{
        this.toastr.successToastr('Employee Updated Successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
      });
      }
      else{
        this.spinner.hide();
        this.toastr.errorToastr('Something went wrong,Please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
      }
    })
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

     //For Getting Department
     getDepartment(){
      this.emergencyservice.global_service('0','/department',"null").pipe(map((x:any) => x.msg)).subscribe(data=>{this.get_department=data;})
     }
     //For Getting position
     getPosition(){
      this.emergencyservice.global_service('0','/position',"null").pipe(map((x:any) => x.msg)).subscribe(data=>{
        this.get_position=data;
       })
     }
     //For Geetting Employee details of particular id
     getEmployeeDetails(data:any){
      this.emergencyservice.global_service('0','/employee',data).pipe(map((x:any) => x.msg)).subscribe(res=>{
        this.emp_id= res[0].employee_id;
        this.email = res[0].email;
      this.LogForm.setValue({
        id:this.id,
        user:localStorage.getItem('Email'),
        employee_id:res[0].employee_id ? res[0].employee_id : '',
        name:res[0].emp_name ? res[0].emp_name : '',
        department:res[0].emp_depart_id ? res[0].emp_depart_id : '',
        position:res[0].emp_pos_id ? res[0].emp_pos_id : '',
        email:res[0].email ? res[0].email : '',
        p_contact:res[0].personal_cnct_no ? res[0].personal_cnct_no : '',
        p_code:res[0].p_code ? res[0].p_code : '',
        er_contact:res[0].er_cnct_no ? res[0].er_cnct_no : '',
        er_code:res[0].er_code ? res[0].er_code : '',
        emp_status:res[0].emp_status ? res[0].emp_status : '',
        user_type:res[0].user_type ? res[0].user_type : '',
        approval_flag:res[0].approval_flag ? res[0].approval_flag : '',
        user_role:res[0].user_role ? res[0].user_role : ''
      })
       this.spinner.hide();

    })
     }
     PreventNonNumeric(_event: any) {
      validations._preventnonNumeric(_event);
    }

    cancel(){
      this.LogForm.form.patchValue({
        id:this.id,
        user:localStorage.getItem('Email'),
        employee_id:this.emp_id,
        name:'',
        department:'',
        position:'',
        email:this.email,
        p_contact:'',
        er_contact:'',
        emp_status:'A',
        user_type:'',
        approval_flag:''
      })
     console.log( this.LogForm)
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
}
