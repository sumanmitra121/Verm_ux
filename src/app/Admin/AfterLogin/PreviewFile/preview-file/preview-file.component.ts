import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { global_url_test } from 'src/app/url';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit {
   doc:any;
   url=global_url_test.URL;
   element:any;
  constructor(private activatedroute:ActivatedRoute,private spinner:NgxSpinnerService) {
    this.spinner.show();
   }

  ngOnInit(): void {this.doc=this.url+this.activatedroute.snapshot.params['form_path'];
      console.log(this.doc);

   }
  contentLoaded(){ this.spinner.hide();}

}
