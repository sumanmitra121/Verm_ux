import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { global_url_test } from 'src/app/url';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit {
   doc:any;
   url=global_url_test.URL;
   element:any;
  constructor(private activatedroute:ActivatedRoute,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.doc=this.url+this.activatedroute.snapshot.params['form_path'];
    if(this.doc!=''){
      this.spinner.show();
    }
    // console.log(this.doc);
    this.spinner.show();
  }
  contentLoaded(){
    // this.element.style.display='none';
    this.spinner.hide();
  }

}
