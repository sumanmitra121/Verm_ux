import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from 'src/app/url';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import * as JSZIP from 'jszip';
import   '../../../assets/jszip-utils.js';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as JSZip from 'jszip';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var JSZipUtils : any
@Component({
  selector: 'app-formschecklistfiles',
  templateUrl: './formschecklistfiles.component.html',
  styleUrls: ['./formschecklistfiles.component.css',]
})
export class FormschecklistfilesComponent implements OnInit {
  keyword = 'form_name';
  headername:any='Form & Checklist';
  icon:any='fa-list-ul';
  url=global_url_test.URL;
  get_text:any='';
  constructor(private route:ActivatedRoute,private emergencyservice:VirtualEmergencyService,private spinner:NgxSpinnerService,private router:Router,private toastr:ToastrManager) { }
  displayedColumns: string[] = ['chk','img','Name', 'Date', 'Type', 'Created_by','Action'];
  dataSource= new MatTableDataSource();
   selection = new SelectionModel<any>(true);
   cat_id:any;
   Get_Uploaded_Files:any=[];
   get_files:any=[];
   get_category:any=[];
   get_files_fix:any=[];
   cat_name:any='';
   view:any='G';
   catg_name:any;
  ngOnInit(): void {
    this.cat_id=this.route.snapshot.params['id']; 
    //For getting files
    this.emergencyservice.global_service('0','/get_forms',`catg_id=${this.cat_id}`).subscribe(data=>{
    this.spinner.show();
     console.log(data)
    this.Get_Uploaded_Files.length=0;
    this.get_files.length=0;
      this.Get_Uploaded_Files=data;
      this.Get_Uploaded_Files=this.Get_Uploaded_Files.msg;   
      if(this.Get_Uploaded_Files!=''){
        this.catg_name=this.Get_Uploaded_Files[0].catg_name;
      for(let i=0;i<this.Get_Uploaded_Files.length;i++){
          this.get_files.push({
            id:this.Get_Uploaded_Files[i].id,
            catg_id:this.Get_Uploaded_Files[i].catg_id,
            form_name:this.Get_Uploaded_Files[i].form_name,
            form_path:this.url+""+this.Get_Uploaded_Files[i].form_path,
            form_type:this.Get_Uploaded_Files[i].form_type,
            catg_name:this.Get_Uploaded_Files[i].catg_name,
            file_name:this.Get_Uploaded_Files[i].form_path.split('/').pop(),
            file_ext:this.Get_Uploaded_Files[i].form_path.split("/")[2].split('.').pop().trim(),
            date:this.Get_Uploaded_Files[i].created_at,
            created_by:this.Get_Uploaded_Files[i].created_by,
             })
             this.Get_Uploaded_Files[i].file_name=this.Get_Uploaded_Files[i].form_path.split('/').pop();
             this.Get_Uploaded_Files[i].file_ext=this.Get_Uploaded_Files[i].form_path.split("/")[2].split('.').pop().trim();
             this.Get_Uploaded_Files[i].form_path=this.url+""+this.Get_Uploaded_Files[i].form_path;
    
         }
         this.dataSource=new MatTableDataSource(this.get_files)
         this.spinner.hide();
        }
      else{
            this.spinner.hide();
      }
      console.log(this.dataSource);
      })
     //For getting category name
     this.emergencyservice.global_service('0','/form_category',null).subscribe(data=>{
      //  console.log(data);
      this.get_category=data;
      this.get_category=this.get_category.msg;
       for(let i=0;i<this.get_category.length;i++){
         if(this.get_category[i].id==this.cat_id){
           this.cat_name=this.get_category[i].catg_name;
           break;
         }
       }
      })
  }

  //For downloading the files
  downloadfile(form_path:any,file_name:any){
    FileSaver.saveAs(form_path,file_name);
  }
  //For changing view
  change_view(view_type:any){
  this.view=view_type;
  }
  //For sorting
  sorting(sort:any){
    this.spinner.show();
    var flag = sort && sort != '' ? sort : null;
    // this.Get_Uploaded_Files.length=0;
    this.emergencyservice.global_service('0','/get_forms','flag='+flag+'&catg_id='+this.cat_id).subscribe(data=>{
    this.get_files.length=0;
      this.get_files=data;
      this.get_files=this.get_files.msg;   
      if(this.get_files!=''){
      for(let i=0;i<this.get_files.length;i++){
          // this.get_files.push({
          //   id:this.Get_Uploaded_Files[i].id,
          //   catg_id:this.Get_Uploaded_Files[i].catg_id,
          //   form_name:this.Get_Uploaded_Files[i].form_name,
          //   form_path:this.Get_Uploaded_Files[i].form_path,
          //   form_type:this.Get_Uploaded_Files[i].form_type,
          //   catg_name:this.Get_Uploaded_Files[i].catg_name,
          //   file_name:this.Get_Uploaded_Files[i].file_name,
          //   file_ext:this.Get_Uploaded_Files[i].file_ext,
          //   date:this.Get_Uploaded_Files[i].created_at,
          //   created_by:this.Get_Uploaded_Files[i].created_by
          //    })
             this.get_files[i].id=this.get_files[i].id;
             this.get_files[i].catg_id=this.get_files[i].catg_id;
             this.get_files[i].form_name=this.get_files[i].form_name;
             this.get_files[i].catg_name=this.get_files[i].catg_name;
            this.get_files[i].form_type=this.get_files[i].form_type,
            this.get_files[i].file_name=this.get_files[i].form_path.split('/').pop(),
            this.get_files[i].file_ext=this.get_files[i].form_path.split("/")[2].split('.').pop().trim(),
            this.get_files[i].form_path=this.url+""+this.get_files[i].form_path,
            this.get_files[i].date=this.get_files[i].created_at,
            this.get_files[i].created_by=this.get_files[i].created_by


         }  
         this.spinner.hide();
        }
      else{
            this.spinner.hide();
      }
      this.dataSource=new MatTableDataSource(this.get_files);
      // this.selection=new SelectionModel<any>(true,this.get_files);

      }) 

  }
  selectEvent(item:any) {
    // console.log(item);
    this.get_files.length=0;
    this.get_files.push({
      id:item.id,
      catg_id:item.catg_id,
      form_name:item.form_name,
      form_path:item.form_path,
      form_type:item.form_type,
      catg_name:item.catg_name,
      file_name:item.file_name,
      file_ext:item.file_ext,
      date:item.created_at,
      created_by:item.created_by,
    })
    this.dataSource=new MatTableDataSource(this.get_files);
    // this.selection=new SelectionModel<any>(true,this.get_files);



  }
  clearInput(item:any){
    //For getting files
    // this.Get_Uploaded_Files.length=0;
    this.get_files.length=0;
    // this.emergencyservice.global_service('0','/get_forms',`catg_id=${this.cat_id}`).subscribe(data=>{
    //   this.Get_Uploaded_Files=data;
    //   this.Get_Uploaded_Files=this.Get_Uploaded_Files.msg;   
      if(this.Get_Uploaded_Files!=''){
      for(let i=0;i<this.Get_Uploaded_Files.length;i++){
          this.get_files.push({
            id:this.Get_Uploaded_Files[i].id,
            catg_id:this.Get_Uploaded_Files[i].catg_id,
            form_name:this.Get_Uploaded_Files[i].form_name,
            form_path:this.Get_Uploaded_Files[i].form_path,
            form_type:this.Get_Uploaded_Files[i].form_type,
            catg_name:this.Get_Uploaded_Files[i].catg_name,
            file_name:this.Get_Uploaded_Files[i].file_name,
            file_ext:this.Get_Uploaded_Files[i].file_ext,
            date:this.Get_Uploaded_Files[i].created_at,
            created_by:this.Get_Uploaded_Files[i].created_by
             })
         }     
        //  console.log(this.get_files);
        }
      else{
      }
      // })
      this.dataSource=new MatTableDataSource(this.get_files);
      // this.selection=new SelectionModel<any>(true,this.get_files);

  }
  onChangeSearch(event: any) {
    this.get_text=event.target.value;
  }

  serach_files(){
    if(this.get_text!=''){
    this.get_files.length=0;
    const checkKey = (val: any) => {
      return (val.form_name.toUpperCase()).includes(this.get_text.toUpperCase()) || (val.file_name.toUpperCase()).includes(this.get_text.toUpperCase());
    }
    this.get_files = this.Get_Uploaded_Files.filter(checkKey);
    this.dataSource=new MatTableDataSource(this.get_files); 
    // this.selection=new SelectionModel<any>(true,this.get_files);
    this.get_text='';   
     }

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
      : this.dataSource.data.forEach((row:any) => this.selection.select(row));
  }
  //for download all files as zip
  move_files(){
    if(this.selection.selected.length>0){
    this.spinner.show();
    var count = 0;
    var zipFilename = this.catg_name;
    var arr=new Array();
    for(let i=0;i<this.selection.selected.length;i++){
      arr[i]=this.selection.selected[i].form_path
    }
    var zip = new JSZip();
   arr.forEach((url)=>{
     var filename=url.split('/').pop();
     JSZipUtils.getBinaryContent(url,(err:any, data:any)=>{
     zip.file(filename, data, {binary:true});
     count++;
     if (count == arr.length) {
      zip.generateAsync({type:'blob'}).then((content) =>{ 
        this.spinner.hide();
        FileSaver.saveAs(content, zipFilename);
      });
   }
  })

   })
  }
  else{
    this.spinner.hide();
     this.toastr.errorToastr("Please choose files",'',{ position: 'top-center', animate: 'slideFromTop', toastTimeout: 5000, enableHTML: true })
  }
  // this.selection.selected.length=0;
  }
}
