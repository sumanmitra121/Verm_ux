import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { jsPDF } from "jspdf";
import { Form, NgForm } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-log-sheet',
  templateUrl: './log-sheet.component.html',
  styleUrls: ['./log-sheet.component.css']
})
export class LogSheetComponent implements OnInit {
  @ViewChild('ManualLog') manuallog!:NgForm;
  @ViewChild('logForm') LogForm!:NgForm;
  displayedColumns: string[] = ['act_by','act_at','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource= new MatTableDataSource();
  get_logsheet:any=[];
  @ViewChild(MatSort) matsort!: MatSort;
  icon:any='fa-file-excel-o';
  headername:any='Log Sheet';
  flag:any='';
  id:any=null;
  del_id:any;
  check_respond:any;
  contents:any;
  Inc_id:any=localStorage.getItem('Inc_id');
  Act_type:any='W';
  Id:any=0;
  get_data:any;
  public now:any;
  frm_dt:any;
  to_dt:any
  constructor(private emergencyService:VirtualEmergencyService,private toastr:ToastrManager,private spinner:NgxSpinnerService) {
      var date = new Date();//For Date Time
      this.now=date.toISOString().substring(0,19);
      this.frm_dt=this.getToday();
      this.to_dt=this.getToday();

   }

  ngOnInit(): void {
  }
fetchdata(){
  // this.spinner.show();
  this.emergencyService.global_service('0','/manuallog','id=').subscribe(data=>{
      this.get_logsheet.length=0;
    this.get_logsheet=data;
    this.get_logsheet=this.get_logsheet.msg;
    this.putdata(this.get_logsheet);
  })
}

putdata(v:any){
  this.dataSource= new MatTableDataSource(v);
  this.dataSource.paginator=this.paginator;
  this.dataSource.sort=this.matsort;
  // this.spinner.hide();

 }
  check_logSheet(event:any){
    this.flag =  event.value;
    if(event.value!='M'){
      this.manuallog.reset();
      this.Id=0;
      this.Inc_id=localStorage.getItem('Inc_id');
      this.Act_type='W';
        this.manuallog.setValue({
        id:this.Id,
        inc_id:this.Inc_id,
        act_type:'W',
        act_by:'',
        activity:'',
        act_at:''
      })
      $('#submitBtn').val('Add');
          this.spinner.hide();
        if($("#addManualLog").is(":visible") || $("#DataTable").is(":visible")){
        $("#addManualLog").hide("slow");
        $("#DataTable").hide("slow");
      }
      else{

      }
    }
    else{
      $("#addManualLog").fadeToggle("slow");
      $("#DataTable").fadeToggle("slow");
      this.fetchdata();
    }
  }
  // modify_modal(del_id:any){this.del_id='';this.del_id=del_id;}
   //For FilterData from data table
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete_log_sheet(){
    this.emergencyService.global_service('0','/manuallog_del','id='+this.del_id).subscribe(data=>{
      // console.log(data);
      this.check_respond=data;
      if(this.check_respond.suc==1){
      this.fetchdata();
        this.toastr.successToastr(this.check_respond.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        }
        else{
          this.toastr.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        }
    })
  }

  logSubmit(downloadAs:any){
   if(this.flag!=''){
     if(this.LogForm.form.value.frm_date <= this.LogForm.form.value.to_date){
    var str= this.flag == 'A' ? '/get_autolog' : (this.flag== 'C' ? '/get_chat_log' : '/get_manuallog'); //After clicking on radio button which api get call
    this.emergencyService.global_service('0',str,'inc_id='+this.LogForm.form.value.inc_id+'&frm_dt='+this.LogForm.form.value.frm_date+'&to_dt='+this.LogForm.form.value.to_date).subscribe(data=>{
      this.contents=data;
      // Check wheather there is any message or not
      if(this.contents.msg!=''){
        // For check wheather a  user want to download as pdf
      if(downloadAs=='P')
      {
       const doc = new jsPDF();
       doc.setFontSize(10);
        doc.text(this.contents.msg, 10, 10);
        var file_name= this.flag=='A' ? '_Auto_log.pdf' : (this.flag=='C' ? '_chat_log.pdf' : '_Manual_log.pdf');
        doc.save(this.LogForm.form.value.frm_date+"_"+this.LogForm.form.value.to_date+file_name);
       }
      else{   // For check wheather a  user want to download as  text
       var textToBlob = new Blob([this.contents.msg], { type: 'text/plain' });
       var file_name= this.flag=='A' ? '_Auto_log.txt' : (this.flag=='C' ? '_chat_log.txt' : '_Manual_log.txt');
        const sFileName = this.LogForm.form.value.frm_date+'_'+this.LogForm.form.value.to_date+file_name;
        let newLink = document.createElement("a");
        newLink.download = sFileName;
        newLink.href = window.webkitURL.createObjectURL(textToBlob);
        newLink.click();
      }
     }
     else{
      this.toastr.errorToastr('No logs available from\n'+this.LogForm.form.value.frm_date+' to '+this.LogForm.form.value.to_date,'Sorry',{position:'top-center',animate:'slideFromTop',toastTimeout:5000});
     }

    })
   }
   else{
    this.toastr.errorToastr('Start date must be greater than end date','',{position:'top-center',animate:'slideFromTop',toastTimeout:5000});
   }
  }
  else{
     this.toastr.errorToastr('Please select an option','',{position:'top-center',animate:'slideFromTop',toastTimeout:5000});
  }
  }
  SubmitForm(ManualLog:Form){
    this.spinner.show();
      this.emergencyService.global_service('1','/manuallog',ManualLog).subscribe(data=>{
        this.check_respond=data;
        if(this.check_respond.suc==1){
          // this.Id=0;
          //  this.manuallog.setValue({
          //    id:this.Id,
          //    inc_id:this.Inc_id,
          //    act_type:'W',
          //    act_by:'',
          //    activity:'',
          //    act_at:''
          //  })
          this.manuallog.reset();
          this.Id=0;
          this.Inc_id=localStorage.getItem('Inc_id');
          this.Act_type='W';
            this.manuallog.setValue({
            id:this.Id,
            inc_id:this.Inc_id,
            act_type:'W',
            act_by:'',
            activity:'',
            act_at:''
          })
           $('#submitBtn').val('Add');
            this.toastr.successToastr(this.check_respond.msg,'',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
           this.fetchdata();
          this.spinner.hide();
           window.scrollTo(window.innerHeight, window.innerWidth);

        }
        else{
          this.spinner.hide();
          this.toastr.errorToastr('Something went wrong, failed to Submit','',{position:'top-center',animate:'slideFromTop',toastTimeout:5000})
        }
      });
  }
  close_card(){$("#addManualLog").fadeToggle("slow");}
  close_DataTable(){$("#DataTable").fadeToggle("slow");}
  modify_logsheet(id:any){
    this.Id=id;
    this.emergencyService.global_service('0','/manuallog','id='+id).subscribe(data=>{
      console.log(data);
      this.get_data=data;
      this.manuallog.setValue({
        inc_id:this.Inc_id,
        act_type:'W',
        id:this.Id,
        act_by:this.get_data.msg[0].act_by,
        activity:this.get_data.msg[0].activity,
        act_at:this.get_data.msg[0].act_at
      })
       $('#submitBtn').val('Update');
       window.scrollTo(0, 0);
    })
  }
  delete_modal(id:any){
   this.del_id=id;
  }
  getToday(){//For Getting Date Only
    return new Date().toISOString().substring(0,10);
  }
}
