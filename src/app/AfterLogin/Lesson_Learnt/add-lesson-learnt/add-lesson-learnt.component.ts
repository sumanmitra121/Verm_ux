import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { global_url_test } from 'src/app/url';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-lesson-learnt',
  templateUrl: './add-lesson-learnt.component.html',
  styleUrls: ['./add-lesson-learnt.component.css']
})
export class AddLessonLearntComponent implements OnInit {
  FILE:any=[];
  _file:any='';

  img_url= global_url_test.URL;
  isFile:number=0;
  paramsString!:number;
  lesson_learnt!: FormGroup;
  constructor(private _route: Router,
    public dialog: MatDialog,
    private datePipe:DatePipe,
    public sanitizer:DomSanitizer,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private api_call: VirtualEmergencyService,
    private toastr:ToastrManager,private spinner:NgxSpinnerService) {
      this.paramsString = Number(atob(this.route.snapshot.params.id))
    this.lesson_learnt = this.fb.group({
      id: [atob(this.route.snapshot.params.id)],
      inc_id: [''],
      inc_no:[localStorage.getItem('Inc_No')],
      user: [localStorage.getItem('Email')],
      ref: ['', [Validators.required]],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      rec: ['', [Validators.required]],
      fileSource: [null],
      file: [[]],
    })
  }

  get f() {return this.lesson_learnt.controls;}
  ngOnInit(): void {
    if(Number(atob(this.route.snapshot.params.id)) > 0){
      console.log(Number(atob(this.route.snapshot.params.id)))
      this.setFormValue();
    }
  }
  setFormValue(){
    this.api_call.global_service('0', '/lesson', 'id='+atob(this.route.snapshot.params.id)).pipe(map((x:any) => x.msg)).subscribe(res => {
       console.log(res);

      if(res.length > 0){
       res.forEach((element:any) => {
        if(element.file_path){
         this.FILE.push({file:this.img_url + element.file_path,id:element.file_id});
         this.lesson_learnt.value.file.push(this.img_url +element.file_path)
        }
       });
       this.isFile = res[0].isFile;
      this.lesson_learnt.patchValue({
        id: res[0].id,
        inc_id: res[0].inc_id ? res[0].inc_id : '',
        user: localStorage.getItem('Email'),
        ref: res[0].reff_no ? res[0].reff_no :'',
        title: res[0].title ? res[0].title : '',
        date: res[0].date ? this.datePipe.transform(res[0].date,'yyyy-MM-dd') : '',
        desc: res[0].description ? res[0].description : '',
        rec: res[0].recom ? res[0].recom : '',
      })
    }
    })
  //setTimeout(() =>{
  //  console.log(this.lesson_learnt.value.file);
  //},1000)
  }
  submit(_type: any) {
   console.log(this.lesson_learnt.invalid)
    if(this.lesson_learnt.invalid){
      this.toastr.errorToastr('Some of fields are invalid or empty','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
      return;
    }
    const formdata = new FormData();
    formdata.append('id', atob(this.route.snapshot.params.id));
    // formdata.append('inc_id', this.lesson_learnt.value.inc_id);
    formdata.append('inc_id', '0');
    formdata.append('user', this.lesson_learnt.value.user);
    formdata.append('reff_no', this.lesson_learnt.value.ref);
    formdata.append('title', this.lesson_learnt.value.title);
    formdata.append('date', this.lesson_learnt.value.date);
    formdata.append('description', this.lesson_learnt.value.desc);
    formdata.append('recom', this.lesson_learnt.value.rec);
    formdata.append('final_flag', _type);
    if(this.lesson_learnt.value.file.length > 0) {
      for (let i = 0; i < this.lesson_learnt.value.file.length ;i++) {
          formdata.append("file", this.lesson_learnt.value.file[i]);
      }
    }
      else{
        formdata.append("file", '');
      }
    var api_name = '/lesson';
    switch(_type){
    case 'N':
             var msg = this.lesson_learnt.value.id > 0 ? 'Updation Successfull' : 'Addition Successfull';
              this.submitData(formdata,api_name,msg);break;
    case 'Y':
             formdata.append('inc_no',this.lesson_learnt.value.inc_no);
             this.openDialog(formdata,api_name);break;
      default:break;
    }

  }


  submitData(formdata:any,api_name:any,msg:any){
    this.spinner.show();
    this.api_call.global_service('1', api_name, formdata).subscribe((res: any) => {
      this.spinner.hide();
      if (res.suc > 0) {
        this._route.navigate(['/lesson_learnt']).then(() => {
          this.toastr.successToastr(msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
             })
      }
      else {
        this.toastr.errorToastr('Submission Failed','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
      }
    })
  }

 openDialog(formdata:any,api_name:any){
    const disalogConfig=new MatDialogConfig();
    disalogConfig.disableClose=false;
    disalogConfig.autoFocus=true;
    disalogConfig.width='35%';
    disalogConfig.data={id:Number(atob(this.route.snapshot.params.id)),api_name:'/lesson_final',name:'lesson_final'}
    const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
    dialogref.afterClosed().subscribe(dt=>{
      // var msg = this.lesson_learnt.value.id > 0 ? 'Updation Successfull! you can now check this in repository section in ' : 'Addition Successfull';
       var msg = 'Successfully saved as pdf in repository section under ' + localStorage.getItem('Inc_No') + ' folder';
      if(dt){this.submitData(formdata,api_name,msg);}
    })
 }

  onFileChange(event: any) {
    if(event.target.files.length > 0){
            for (let i = 0; i < event.target.files.length; i++) {
              if(event.target.files[i].type == 'image/png' ||
              event.target.files[i].type == 'image/jpg' ||
              event.target.files[i].type == 'image/jpeg'){
                this.lesson_learnt.value.file.push( event.target.files[i]);
                this.FILE.push({file:URL.createObjectURL(
                  new Blob([event.target.files[i]], {
                    type: event.target.files[i].type.toString(),
                  })
                ),id:0});
                // var reader = new FileReader();
                // reader.onload = (event:any) => {
                //   this.FILE.push({file:event.target.result,id:0});
                // };
                // reader.readAsDataURL(event.target.files[i]);
              }
              else{
                this.toastr.errorToastr('Please Select correct format','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:5000});
              }
            }
    }
    else{
      this.FILE.length  = 0;
      this.lesson_learnt.patchValue({
        file:[]
      });
    }
  }
  getIncDetails(e: any) {
    if(Number(atob(this.route.snapshot.params.id)) > 0){
       return;
    }
    this.lesson_learnt.patchValue({
      inc_id: e.id,
    });
  }

  deleteMeetingFile(id:any,index:any){
   const disalogConfig=new MatDialogConfig();
    disalogConfig.disableClose=false;
    disalogConfig.autoFocus=true;
    disalogConfig.width='35%';
    disalogConfig.data={id:'',api_name:'/lesson_file_del',name:'board Type'};
    const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
    dialogref.afterClosed().subscribe(dt=>{
      if(dt){
        if(id > 0){
          this.api_call.global_service('0','/lesson_file_del','id='+id).subscribe( (res:any) =>{
            if(res.suc > 0){
               this.FILE.splice(index,1);
              this.lesson_learnt.value.file.splice(index,1);
              console.log(this.FILE);
               console.log(this.lesson_learnt.value.file);
            }
         })
        }
        else{
           this.FILE.splice(index,1);
           this.lesson_learnt.value.file.splice(index,1);
           console.log(this.FILE);
           console.log(this.lesson_learnt.value.file);

        }
      }
    })
  }
  clickToOpenFile(File:any){
    global_url_test.ClickToOpenFile(File);
  }

}
