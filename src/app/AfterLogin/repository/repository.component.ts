import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
import * as FileSaver from 'file-saver';
import '../../../assets/jszip-utils.js';
import * as JSZip from 'jszip';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
declare var JSZipUtils: any;
@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
    animations: [
        trigger('openClose', [
            state('open', style({
                height: '*',
                opacity: 1,
            })),
            state('closed', style({
                height: '0',
                opacity: 0
            })),
            transition('open => closed', [
                animate('0.35s')
            ]),
            transition('closed => open', [
                animate('0.35s')
            ]),
        ])],
})
export class RepositoryComponent implements OnInit {
  showCardBody = true;
  @ViewChild('logForm') LogForm!: NgForm;
  headername: any = 'Repository';
  icon: any = 'fa-pie-chart';
  view = 'L';
  get_category: any = [];
  check_format: boolean = true;
  File: any;
  keyword = 'form_name';
  url = global_url_test.URL;
  get_text: any = '';
  open_div: any;
  displayedColumns: string[] = [
    'chk',
    'img',
    'Name',
    'Date',
    'Type',
    'Created_by',
    'Action',
  ];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true);
  cat_id: any;
  Get_Uploaded_Files: any = [];
  get_files: any = [];
  user: any = localStorage.getItem('Email');
  check_response: any;
  catg_id: any;
  catg_name: any;
  constructor(
    private datePipe: DatePipe,
    private emergencyservice: VirtualEmergencyService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.catg_id = this.activatedRoute.snapshot.params['cat_id'];
    this.catg_name = this.activatedRoute.snapshot.params['cat_name'];
    //For getting files
    this.emergencyservice
      .global_service('0', '/get_repository', 'catg_id=' + this.catg_id)
      .subscribe((data) => {
        this.spinner.show();
        this.Get_Uploaded_Files.length = 0;
        this.get_files.length = 0;
        this.Get_Uploaded_Files = data;
        this.Get_Uploaded_Files = this.Get_Uploaded_Files.msg;
        if (this.Get_Uploaded_Files != '') {
          for (let i = 0; i < this.Get_Uploaded_Files.length; i++) {
            this.get_files.push({
              id: this.Get_Uploaded_Files[i].id,
              catg_id: this.Get_Uploaded_Files[i].catg_id,
              form_name: this.Get_Uploaded_Files[i].form_name,
              form_path: this.url + '' + this.Get_Uploaded_Files[i].form_path,
              path: this.Get_Uploaded_Files[i].form_path,
              form_type: this.Get_Uploaded_Files[i].form_type,
              catg_name: this.Get_Uploaded_Files[i].catg_name,
              file_name: this.Get_Uploaded_Files[i].form_path.split('/').pop(),
              // file_name:this.Get_Uploaded_Files[i].file_name,
              file_ext: this.Get_Uploaded_Files[i].form_path
                .split('.')
                .pop()
                .trim(),
              date: this.Get_Uploaded_Files[i].created_at,
              created_by: this.Get_Uploaded_Files[i].created_by,
            });
            this.Get_Uploaded_Files[i].file_name = this.Get_Uploaded_Files[
              i
            ].form_path
              .split('/')
              .pop();
            this.Get_Uploaded_Files[i].file_ext = this.Get_Uploaded_Files[
              i
            ].form_path
              .split('/')[1]
              .split('.')
              .pop()
              .trim();
            this.Get_Uploaded_Files[i].path =
              this.Get_Uploaded_Files[i].form_path;
            this.Get_Uploaded_Files[i].form_path =
              this.url + '' + this.Get_Uploaded_Files[i].form_path;
          }
          this.dataSource = new MatTableDataSource(this.get_files);
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }
  //For sorting
  sorting(sort: any) {
    this.spinner.show();
    var flag = sort && sort != '' ? sort : null;
    this.emergencyservice
      .global_service(
        '0',
        '/get_repository',
        'catg_id=' + this.catg_id + '&flag=' + flag
      )
      .subscribe((data) => {
        this.get_files.length = 0;
        this.get_files = data;
        this.get_files = this.get_files.msg;
        if (this.get_files != '') {
          for (let i = 0; i < this.get_files.length; i++) {
            this.get_files[i].id = this.get_files[i].id;
            this.get_files[i].catg_id = this.get_files[i].catg_id;
            this.get_files[i].form_name = this.get_files[i].form_name;
            this.get_files[i].catg_name = this.get_files[i].catg_name;
            (this.get_files[i].form_type = this.get_files[i].form_type),
              (this.get_files[i].file_name = this.get_files[i].form_path
                .split('/')
                .pop()),
              (this.get_files[i].file_ext = this.get_files[i].file_name
                .split('.')
                .pop()
                .trim()),
              (this.get_files[i].path = this.get_files[i].form_path),
              (this.get_files[i].form_path =
                this.url + '' + this.get_files[i].form_path),
              (this.get_files[i].date = this.get_files[i].created_at),
              (this.get_files[i].created_by = this.get_files[i].created_by);
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        this.dataSource = new MatTableDataSource(this.get_files);
      });
  }
  selectEvent(item: any) {
    this.get_files.length = 0;
    this.get_files.push({
      id: item.id,
      catg_id: item.catg_id,
      form_name: item.form_name,
      form_path: item.form_path,
      path: item.path,
      form_type: item.form_type,
      catg_name: item.catg_name,
      file_name: item.file_name,
      file_ext: item.file_name.split('.').pop().trim(),
      date: item.created_at,
      created_by: item.created_by,
    });
    this.dataSource = new MatTableDataSource(this.get_files);
  }
  // For Changing list view and grid view
  change_view(view_type: any) {
    this.view = view_type;
  }
  // For Select a File
  fileChangeEvent(event: any) {
    if (
      event.target.files[0].name.split('.')[1] == 'pdf' ||
      event.target.files[0].name.split('.')[1] == 'doc' ||
      event.target.files[0].name.split('.')[1] == 'docx'
    ) {
      this.check_format = true;
      this.File = event.target.files[0];
    } else {
      this.check_format = false;
    }
  }
  Submit(logForm: Form) {
    this.spinner.show();
    const formdata = new FormData();
    formdata.append('file', this.File);
    formdata.append('user', this.user);
    formdata.append('form_name', this.LogForm.form.value.form_name);
    formdata.append('catg_id', this.catg_id);
    formdata.append('catg_name', this.catg_name);
    this.emergencyservice
      .global_service('1', '/get_repository', formdata)
      .subscribe((data) => {
        this.check_response = data;
        if (this.check_response.suc == 1) {
          var dt = global_url_test.getrepository(
            localStorage.getItem('Email'),
            this.File.name,
            this.datePipe.transform(new Date(), 'dd/MM/YYYY hh:mma')
          );
          this.emergencyservice
            .global_service('1', '/post_notification', dt)
            .subscribe((data) => {
              console.log(data);
            });
          this.toastr.successToastr(this.check_response.msg, '', {
            position: 'top-center',
            animate: 'slideFromTop',
            toastTimeout: 50000,
          });
          this.showCardBody = !this.showCardBody;
          this.LogForm.reset();
          this.File = '';
          //For getting files
          this.emergencyservice
            .global_service('0', '/get_repository', null)
            .subscribe((data) => {
              this.Get_Uploaded_Files.length = 0;
              this.get_files.length = 0;
              this.Get_Uploaded_Files = data;
              this.Get_Uploaded_Files = this.Get_Uploaded_Files.msg;
              if (this.Get_Uploaded_Files != '') {
                for (let i = 0; i < this.Get_Uploaded_Files.length; i++) {
                  this.get_files.push({
                    id: this.Get_Uploaded_Files[i].id,
                    catg_id: this.Get_Uploaded_Files[i].catg_id,
                    form_name: this.Get_Uploaded_Files[i].form_name,
                    form_path:
                      this.url + '' + this.Get_Uploaded_Files[i].form_path,
                    path: this.Get_Uploaded_Files[i].form_path,
                    form_type: this.Get_Uploaded_Files[i].form_type,
                    catg_name: this.Get_Uploaded_Files[i].catg_name,
                    file_name: this.Get_Uploaded_Files[i].form_path
                      .split('/')
                      .pop(),
                    file_ext: this.Get_Uploaded_Files[i].form_path
                      .split('.')
                      .pop()
                      .trim(),
                    date: this.Get_Uploaded_Files[i].created_at,
                    created_by: this.Get_Uploaded_Files[i].created_by,
                  });
                  this.Get_Uploaded_Files[i].file_name =
                    this.Get_Uploaded_Files[i].form_path.split('/').pop();
                  this.Get_Uploaded_Files[i].file_ext = this.Get_Uploaded_Files[
                    i
                  ].form_path
                    .split('/')[1]
                    .split('.')
                    .pop()
                    .trim();
                  this.Get_Uploaded_Files[i].form_path =
                    this.url + '' + this.Get_Uploaded_Files[i].form_path;
                }
                this.dataSource = new MatTableDataSource(this.get_files);
              } else {
              }
            });
          // this.ngOnInit();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.errorToastr(this.check_response.msg, '', {
            position: 'top-center',
            animate: 'slideFromTop',
            toastTimeout: 50000,
          });
        }
      });
  }
  //For downloading single files
  downloadfile(form_path: any, file_name: any) {
    FileSaver.saveAs(form_path, file_name);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
  clearInput(item: any) {
    //For getting files
    this.get_files.length = 0;
    // this.emergencyservice.global_service('0','/get_forms',`catg_id=${this.cat_id}`).subscribe(data=>{
    //   this.Get_Uploaded_Files=data;
    //   this.Get_Uploaded_Files=this.Get_Uploaded_Files.msg;
    console.log(this.Get_Uploaded_Files);

    if (this.Get_Uploaded_Files != '') {
      for (let i = 0; i < this.Get_Uploaded_Files.length; i++) {
        this.get_files.push({
          id: this.Get_Uploaded_Files[i].id,
          catg_id: this.Get_Uploaded_Files[i].catg_id,
          form_name: this.Get_Uploaded_Files[i].form_name,
          form_path: this.Get_Uploaded_Files[i].form_path,
          path: this.Get_Uploaded_Files[i].path,
          form_type: this.Get_Uploaded_Files[i].form_type,
          catg_name: this.Get_Uploaded_Files[i].catg_name,
          file_name: this.Get_Uploaded_Files[i].file_name,
          file_ext: this.Get_Uploaded_Files[i].file_name
            .split('.')
            .pop()
            .trim(),
          date: this.Get_Uploaded_Files[i].created_at,
          created_by: this.Get_Uploaded_Files[i].created_by,
        });
      }
      //  console.log(this.get_files);
    } else {
    }
    // })
    this.dataSource = new MatTableDataSource(this.get_files);
    // this.selection=new SelectionModel<any>(true,this.get_files);
  }
  onChangeSearch(event: any) {
    this.get_text = event.target.value;
  }

  serach_files() {
    if (this.get_text != '') {
      this.get_files.length = 0;
      const checkKey = (val: any) => {
        return (
          val.form_name.toUpperCase().includes(this.get_text.toUpperCase()) ||
          val.file_name.toUpperCase().includes(this.get_text.toUpperCase())
        );
      };
      this.get_files = this.Get_Uploaded_Files.filter(checkKey);
      for (let i = 0; i < this.get_files.length; i++) {
        this.get_files[i].id = this.get_files[i].id;
        this.get_files[i].catg_id = this.get_files[i].catg_id;
        this.get_files[i].form_name = this.get_files[i].form_name;
        this.get_files[i].catg_name = this.get_files[i].catg_name;
        (this.get_files[i].form_type = this.get_files[i].form_type),
          (this.get_files[i].file_name = this.get_files[i].form_path
            .split('/')
            .pop()),
          (this.get_files[i].file_ext = this.get_files[i].file_name
            .split('.')
            .pop()
            .trim()),
          (this.get_files[i].form_path = this.get_files[i].form_path),
          (this.get_files[i].path = this.get_files[i].path),
          (this.get_files[i].date = this.get_files[i].created_at),
          (this.get_files[i].created_by = this.get_files[i].created_by);
      }
      this.dataSource = new MatTableDataSource(this.get_files);
      // this.selection=new SelectionModel<any>(true,this.get_files);
      this.get_text = '';
    }
    //  console.log(this.get_files);
  }
  //for download all files as zip
  move_files() {
    if (this.selection.selected.length > 0) {
      this.spinner.show();
      var count = 0;
      var zipFilename = this.catg_name;
      var arr = new Array();
      for (let i = 0; i < this.selection.selected.length; i++) {
        arr[i] = this.selection.selected[i].form_path;
      }
      var zip = new JSZip();
      arr.forEach((url) => {
        var filename = url.split('/').pop();
        JSZipUtils.getBinaryContent(url, (err: any, data: any) => {
          zip.file(filename, data, { binary: true });
          count++;
          if (count == arr.length) {
            zip.generateAsync({ type: 'blob' }).then((content) => {
              this.spinner.hide();
              FileSaver.saveAs(content, zipFilename);
            });
          }
        });
      });
    } else {
      this.spinner.hide();
      this.toastr.errorToastr('Please choose files', '', {
        position: 'top-center',
        animate: 'slideFromTop',
        toastTimeout: 5000,
        enableHTML: true,
      });
    }
    // this.selection.selected.length=0;
  }
  open_card() {
    this.showCardBody = !this.showCardBody;
    this.LogForm.reset();
    this.File = '';
  }
  close_div() {
    this.showCardBody = !this.showCardBody;
    this.LogForm.reset();
    this.File = '';
  }
}
