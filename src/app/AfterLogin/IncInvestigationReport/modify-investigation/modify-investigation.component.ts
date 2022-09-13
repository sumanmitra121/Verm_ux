import { global_url_test } from './../../../url';
import { DatePipe } from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-modify-investigation',
  templateUrl: './modify-investigation.component.html',
  styleUrls: ['./modify-investigation.component.css']
})
export class ModifyInvestigationComponent implements OnInit {
  investigationForm!: FormGroup;
  constructor(
    public routeParams: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private spinner:NgxSpinnerService,
    private api_call: VirtualEmergencyService,
    private route: Router,
    private toastr:ToastrManager,
    private fb: FormBuilder) {
    // console.log(this.routeParams.snapshot.params.id);
    this.investigationForm = this.fb.group({
      ref_no:['',Validators.required],
      inc_name:['',Validators.required],
      reported_by:['',Validators.required],
      reported_on:['',Validators.required],
      approved_by:['',Validators.required],
      approved_on:['',Validators.required],
      summary:['',Validators.required],
      overview:['',Validators.required],
      method:['',Validators.required],
      investigation_team_members:this.fb.array([]),
      background:['',Validators.required],
      facility:['',Validators.required],
      description:['',Validators.required],
      incDtls:['',Validators.required],
      details:['',Validators.required],
      sequence:['',Validators.required],
      impact:['',Validators.required],
      result:['',Validators.required],
      analysis:['',Validators.required],
      conclusion:['',Validators.required],
      recommendations:['',Validators.required],
      user: [localStorage.getItem('Email')],
      attch1:[''],
      file1:[''],
      attch2:[''],
      file2:[''],
      attch3:[''],
      file3:[''],
      files1:[''],
      files2:[''],
      files3:[''],
      files1_to_preview:[''],
      files2_to_preview:[''],
      files3_to_preview:[''],
    })


   }

  ngOnInit(): void {
    // this.addnew_investigation_team_member();
    // console.log(Number(atob(this.routeParams.snapshot.params.id)));

    if(Number(atob(this.routeParams.snapshot.params.id)) > 0){
      this.api_call.global_service(0,'/investigation','id='+Number(atob(this.routeParams.snapshot.params.id))).pipe(map((x:any) => x.msg)).subscribe(res =>{
        console.log(res);

        this.investigationForm.patchValue({
          ref_no:res[0].ref_no,
          inc_name:res[0].inc_name,
          reported_by:res[0].reported_by,
          reported_on:this.datePipe.transform(res[0].reported_on,'YYYY-MM-dd'),
          approved_by:res[0].approved_by,
          approved_on:this.datePipe.transform(res[0].approved_on,'YYYY-MM-dd'),
          summary:res[0].exec_summary,
          overview:res[0].inc_overview,
          method:res[0].inv_method,
          background:res[0].inv_method,
          facility:res[0].facility_info,
          description:res[0].inc_desc,
          incDtls:res[0].inc_dtls,
          details:res[0].injured_person_dtls,
          sequence:res[0].seq_of_inv,
          impact:res[0].inc_impact,
          result:res[0].inc_inv_res,
          analysis:res[0].analysis_of_findings,
          conclusion:res[0].conclusion,
          recommendations:res[0].recommendation,
          user: localStorage.getItem('Email'),
          attch1:res[0].file1_dtls,
          attch2:res[0].file2_dtls,
          attch3:res[0].file3_dtls,
          files1:res[0].file_1!='' ? global_url_test.URL+res[0].file1 : '',
          files2:res[0].file_2 != '' ? global_url_test.URL+res[0].file_2 : '',
          files3:res[0].file_3 != '' ? global_url_test.URL+res[0].file_3 : '',
          files1_to_preview:res[0].file_1!='' ? global_url_test.URL+res[0].file_1 : '',
          files2_to_preview:res[0].file_2 != '' ? global_url_test.URL+res[0].file_2 : '',
          files3_to_preview:res[0].file_3 != '' ? global_url_test.URL+res[0].file_3 : '',
        })
        res[0].team_members.forEach((element:any) => {
          this.inv_team_member.push(this.set_investigation_team_member(element.id,element.name,element.designation,element.inv_team_designation));
        });

      })

    }
    else{this.addnew_investigation_team_member();}
  }

  get inv_team_member() : FormArray {
    return this.investigationForm.get("investigation_team_members") as FormArray;
  }
   new_investigation_team_member(): FormGroup{
    return this.fb.group({
      id:[0],
      name: ['',Validators.required],
      designation: ['',Validators.required],
      inv_team_designation: ['',Validators.required],
    });
   }

   set_investigation_team_member(id:any,name:any,designation:any,inv_team_designation:any): FormGroup{
    return this.fb.group({
      id:[id],
      name: [name,Validators.required],
      designation: [designation,Validators.required],
      inv_team_designation: [inv_team_designation,Validators.required],
    });
   }


   addnew_investigation_team_member() {
    this.inv_team_member.push(this.new_investigation_team_member());
    console.log(this.inv_team_member);
  }


  submit_investigationReport(_type:any){
   var apiname = _type =='SD' ? '/investigation' : '/investigation';
   switch(_type){
    case 'SF':this.openDialog(apiname,_type);
              break;
    case 'SD':this.spinner.show();
              this.submitForm(apiname,_type);
              break;
    default:  break;

   }
  }

  openDialog(api_name:any,_type:any){
    const disalogConfig=new MatDialogConfig();
    disalogConfig.disableClose=false;
    disalogConfig.autoFocus=true;
    disalogConfig.width='35%';
    disalogConfig.data={id:Number(atob(this.routeParams.snapshot.params.id)),name:'lesson_final'}
    const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
    dialogref.afterClosed().subscribe(dt=>{
      // var msg = this.lesson_learnt.value.id > 0 ? 'Updation Successfull! you can now check this in repository section in ' : 'Addition Successfull';
       var msg = 'Successfully saved as pdf in repository section under ' + localStorage.getItem('Inc_No') + ' folder';
      if(dt){
        this.spinner.show();
        this.submitForm(api_name,_type);
      }
    })
 }
  submitForm(apiname:any,_type:any){
        const fd = new FormData();
        fd.append('final_flag',_type == 'SD' ? 'N' : 'Y');
        fd.append('user',this.investigationForm.value.user);
        fd.append('id',atob(this.routeParams.snapshot.params.id));
        fd.append('ref_no',this.investigationForm.value.ref_no);
        fd.append('inc_name',this.investigationForm.value.inc_name);
        fd.append('reported_by', this.investigationForm.value.reported_by);
        fd.append('reported_on', this.investigationForm.value.reported_on);
        fd.append('approved_by', this.investigationForm.value.approved_by);
        fd.append('approved_on', this.investigationForm.value.approved_on);
        fd.append('exec_summary', this.investigationForm.value.summary);
        fd.append('inc_overview', this.investigationForm.value.overview);
        fd.append('inv_method', this.investigationForm.value.method);
        var Investigation_Team_Members: any[] = [];
        this.investigationForm.value.investigation_team_members.forEach((element: any,index:any) => {
          Investigation_Team_Members.push(element);
          });
        fd.append('team_members',JSON.stringify(Investigation_Team_Members));
        fd.append('facility_info', this.investigationForm.value.background);
        fd.append('other_fact', this.investigationForm.value.facility);
        fd.append('inc_desc', this.investigationForm.value.description);
        fd.append('inc_dtls', this.investigationForm.value.incDtls);
        fd.append('injured_person_dtls', this.investigationForm.value.details);
        fd.append('seq_of_inv', this.investigationForm.value.sequence);
        fd.append('inc_impact', this.investigationForm.value.impact);
        fd.append('inc_inv_res', this.investigationForm.value.result);
        fd.append('analysis_of_findings', this.investigationForm.value.analysis);
        fd.append('conclusion', this.investigationForm.value.conclusion);
        fd.append('recommendation', this.investigationForm.value.recommendations);
        fd.append('file1_dtls', this.investigationForm.value.attch1);
        fd.append('file1', this.investigationForm.value.files1);
        fd.append('file2_dtls', this.investigationForm.value.attch2);
        fd.append('file2', this.investigationForm.value.files2);
        fd.append('file3_dtls', this.investigationForm.value.attch3);
        fd.append('file3', this.investigationForm.value.files3);
       this.api_call.global_service(1,apiname,fd).subscribe((res:any) =>{
        this.spinner.hide();
        if(res.suc > 0){
              this.route.navigate(['/investigationRPT']).then(() =>{
                this.toastr.successToastr(res.msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
              })
        }
        else{
          this.toastr.errorToastr('Something went wrong! please try again after sometime','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000});
        }
       })
  }

  removeInv_Team_Member(_index:any,_id:any){
        this.openDialogForDelete(_index,_id);
  }
  selectFile(event:any,att_type:any){
    if(event.target.files.length > 0){
      this.setattachments(event.target.files[0],att_type);
    }
    else{
      this.setattachments('',att_type);
    }
    this.preview(event.target.files.length > 0 ? event.target.files[0] : '',att_type);

  }
  setattachments(event:any,att_type:any){
    if(att_type == 1){
        this.investigationForm.patchValue({
          files1:event
        })
    }
    else if(att_type == 2){
      this.investigationForm.patchValue({
        files2:event
      })
    }
    else{
      this.investigationForm.patchValue({
        files3:event
      })
    }
    console.log(this.investigationForm);

  }

  preview(event:any,_type:any){
    if(event!= ''){
      const rd = new FileReader();
      rd.readAsDataURL(event);
      rd.onload = (_event) => {
            this.setAttachmentsforPreview(rd.result,_type)
      }
    }
    else{
      this.setAttachmentsforPreview(event,_type)
    }

  }

  setAttachmentsforPreview(file:any,_type:any){
    if(_type == 1){
      this.investigationForm.patchValue({
        files1_to_preview:file

      })
  }
  else if(_type == 2){
    this.investigationForm.patchValue({
      files2_to_preview:file
    })
  }
  else{
    this.investigationForm.patchValue({
      files3_to_preview:file
    })
  }
  }
  openDialogForDelete(_index:any,_id:any){
    const disalogConfig=new MatDialogConfig();
    disalogConfig.disableClose=false;
    disalogConfig.autoFocus=true;
    disalogConfig.width='35%';
    disalogConfig.data = {
      api_name: '',
      name: 'board Type',
      id: _id,
    };
    const dialogref = this.dialog.open(DialogalertComponent, disalogConfig);
    dialogref.afterClosed().subscribe(dt=>{

          if(dt){
            console.log(dt);

            if(_id > 0){
               this.api_call.global_service(0,'/investigation_del','flag='+2+'&id='+_id).subscribe((res:any) =>{
                 if(res.suc > 0){
                      this.removeRow(_index);
                      this.toastr.successToastr(res.msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
                 }
                 else{
                      this.toastr.errorToastr('Deletion not possible! please try again later','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
                 }
               })
            }
            else{
               this.removeRow(_index);
            }

          }
    })
  }
  removeRow(_index:any){
    this.inv_team_member.removeAt(_index);
  }
}
