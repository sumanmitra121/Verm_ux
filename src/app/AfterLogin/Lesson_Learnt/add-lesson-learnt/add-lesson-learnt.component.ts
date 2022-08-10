import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-lesson-learnt',
  templateUrl: './add-lesson-learnt.component.html',
  styleUrls: ['./add-lesson-learnt.component.css']
})
export class AddLessonLearntComponent implements OnInit {
  lesson_learnt!: FormGroup;
  constructor(private _route: Router,
    private datePipe:DatePipe,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api_call: VirtualEmergencyService,
    private toastr:ToastrManager,private spinner:NgxSpinnerService) {
    this.lesson_learnt = this.fb.group({
      id: [atob(this.route.snapshot.params.id)],
      inc_id: [''],
      user: [localStorage.getItem('Email')],
      ref: ['', [Validators.required]],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      rec: ['', [Validators.required]],
      fileSource: [null],
      file: [null],

    })
  }

  get f() {
    return this.lesson_learnt.controls;
  }
  ngOnInit(): void {
    if(Number(atob(this.route.snapshot.params.id)) > 0){
      this.setFormValue();
    }
  }
  setFormValue(){
     console.log("data")
    this.api_call.global_service('0', '/lesson', 'id='+atob(this.route.snapshot.params.id)).pipe(map((x:any) => x.msg)).subscribe(res => {
       console.log(res);
console.log(this.datePipe.transform(res[0].date,'dd/mm/YYYY'));

      this.lesson_learnt.patchValue({
        id: res[0].id,
        inc_id: res[0].inc_id,
        user: localStorage.getItem('Email'),
        ref: res[0].reff_no,
        title: res[0].title,
        date: this.datePipe.transform(res[0].date,'dd/MM/YYYY'),
        desc: res[0].description,
        rec: res[0].recom,
        fileSource: res[0].file_name,
        files: res[0].file_path
      })
      console.log(this.lesson_learnt);

    })
  }
  submit(_type: any) {
    if(this.lesson_learnt.invalid){
      this.toastr.errorToastr('Some of fields are empty','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
      return;
    }
    this.spinner.show();
    const formdata = new FormData();
    formdata.append('id', atob(this.route.snapshot.params.id));
    formdata.append('inc_id', this.lesson_learnt.value.inc_id);
    formdata.append('user', this.lesson_learnt.value.user);
    formdata.append('reff_no', this.lesson_learnt.value.ref);
    formdata.append('title', this.lesson_learnt.value.title);
    formdata.append('date', this.lesson_learnt.value.date);
    formdata.append('description', this.lesson_learnt.value.desc);
    formdata.append('recom', this.lesson_learnt.value.rec);
    for (let img_file of  this.lesson_learnt.value.file) {
      formdata.append("file", img_file);
    }
    var api_name = _type == 'D' ? '/lesson' : '';
    this.api_call.global_service('1', api_name, formdata).subscribe((res: any) => {
    this.spinner.hide();
      if (res.suc > 0) {
        var msg = this.lesson_learnt.value.id > 0 ? 'Updation Successfull' : 'Addition Successfull';
        this._route.navigate(['/lesson_learnt']).then(() => {
          this.toastr.successToastr(msg,'',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
             })
      }
      else {
        this.toastr.errorToastr('Submission Failed','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
      }
    })
  }
  onFileChange(event: any) {
    if(event.target.files.length > 0){
        this.lesson_learnt.patchValue({
              file: event.target.files
            });
    }
  }
  getIncDetails(e: any) {
    if(Number(atob(this.route.snapshot.params.id)) > 0){
       return;
    }
    this.lesson_learnt.patchValue({
      inc_id: e.id
    });
    console.log(Number(atob(this.route.snapshot.params.id)));

  }
}
