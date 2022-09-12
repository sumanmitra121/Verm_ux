import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
declare var XLSX : any;
@Component({
  selector: 'app-report-data-pooldetails',
  templateUrl: './report-data-pooldetails.component.html',
  styleUrls: ['./report-data-pooldetails.component.css']
})
export class ReportDataPooldetailsComponent implements OnInit , AfterViewInit{
  _show_all_count:any;
  _u_type = localStorage.getItem('User_type');
  ctx:any="";
 workbookXML:any= "";
 worksheetsXML:any= "";
  rowsXML:any="";
  link:any;
  show:boolean=true;
  @ViewChild(MatTableExporterDirective) matTableExporter!: MatTableExporterDirective;
  @ViewChild('logForm') logform!:NgForm;
  @ViewChild('LogForm') board_form!:NgForm;
  displayedColumns: string[] =[];
  displayedColumns1: string[] =[];
  displayedColumns2: string[] =[];
  displayedColumns3: string[] =[];
  displayedColumns4: string[] =[];
  displayedColumns5: string[] =[];
  displayedColumns6: string[] =[];
  displayedColumns7: string[] =[];
  displayedColumns_handover:string[] = ['Incident','Handover_from','Handover_to','Summary','reason']
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matsort!: MatSort;
dataSource= new MatTableDataSource();
dataSource1= new MatTableDataSource();
dataSource2= new MatTableDataSource();
dataSource3= new MatTableDataSource();
dataSource4= new MatTableDataSource();
dataSource5= new MatTableDataSource();
dataSource6= new MatTableDataSource();
dataSource7= new MatTableDataSource();

  headername:any='Form & Checklist';
  icon:any='fa-list-ul';
  Inc_id:any;
  Inc_type:any;
  get_allIncident:any=[];
  get_incident_details:any=[];
  get_incident_details1:any=[];
  get_incident_details2:any=[];
  get_incident_details3:any=[];
  get_incident_details4:any=[];
  get_incident_details5:any=[];
  get_incident_details6:any=[];
  get_incident_details7:any=[];
  get_tier:any=[];

  board_stats:any='';
  WindowObject:any;
  divToPrint:any;
  Report_type:any;
  print_incidentStatus:any=[];
  get_prob_status:any=[];
  now_to:any;
 now:any;
 multi:any=[];
 probValue:any=[];
 excelClick:any;
 element:any;
  constructor(private route:ActivatedRoute,private emergencyservice:VirtualEmergencyService,private toastr:ToastrManager,private spinner:NgxSpinnerService) {
      this.now = new Date().toISOString().substring(0,10);
      this.now_to=new Date().toISOString().substring(0,10);
  }


  ngOnInit(): void {
    this.Inc_type=this.route.snapshot.params['inc_type'];
    this.Report_type = this.Inc_type=='I' ? 'Incident Reports' : (this.Inc_type=='A' ? 'Activation Reports' : (this.Inc_type=='C' ? 'Live Logs' : (this.Inc_type=='B' ? 'Boards' : (this.Inc_type=='L' ? 'Log Sheets' : (this.Inc_type=='CL' ? 'Call Logger' : 'HandOver Reports')))))
    if(this.Inc_type=='B' || this.Inc_type=='C' || this.Inc_type=='L' || this.Inc_type=='CL' || this.Inc_type=='I' || this.Inc_type=='A' || this.Inc_type=='H') {
      this.emergencyservice.global_service('0','/get_all_incident',null).pipe(map((x:any) => x.msg)).subscribe(data=>{
         this.get_allIncident=data;
      })
    }
    if(this.Inc_type=='I'){
            this.getTier();
    }
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.Inc_type == 'I' || this.Inc_type == 'A' ?
      this.logform.controls["inc_name"].patchValue('0') :
      this.logform.controls["inc_name"].patchValue('');
      this.Inc_type == 'I' ? this.logform.controls["tier_id"].patchValue('0') : '';
    },500)

  }
  form_submit(logForm:Form){
    //  console.log(this.logform.form.value.logTypes );
     this.print_incidentStatus.length=0;
     this.get_incident_details.length=0;
     var api_url=this.Inc_type=='A' ? '/activation_report' : (this.Inc_type=='I' ? '/incident_report': (this.Inc_type=='C' ? '/chat_report' : (this.Inc_type=='CL' ? '/call_log_report' : (this.Inc_type=='L' && this.logform.form.value.logTypes=='1') ? '/autolog_report' :'/manuallog_report')))
     this.displayedColumns=this.Inc_type=='A' ? ['Date','incident_name','team_name','Status','created_by'] : (this.Inc_type=='I' ?  ['Incident_no','Incident_type','Incident_name', 'Incident_location','Initial_tier','Final_tier','event_description','remarks','created_at','Created_By','close_date','Closed_by','Closed_at','approved_by','approved_at'] : (this.Inc_type=='C' ? ['Date','emp_name','chat','file'] : (this.Inc_type=='CL' ? ['Date','ref_no','made_by','made_to','received_by','call_details'] : [])))
    if(this.Inc_type=='I' ){
     this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date+'&tier_id='+this.logform.form.value.tier_id).subscribe((data:any)=>{
      this.get_incident_details=data;
      this._show_all_count = data.count_dt
      this.get_incident_details=this.get_incident_details.msg;
      this.dataSource=new MatTableDataSource(this.get_incident_details);
      if(this.get_incident_details.length > 0){}
      else{this.toastr.errorToastr('No reports available from '+this.logform.form.value.frm_date + ' to '+ this.logform.form.value.to_date,'')}
      })
    }
    else if(this.Inc_type=='A'){
      this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        this.dataSource=new MatTableDataSource(this.get_incident_details);
        if(this.get_incident_details.length > 0){}
        else{this.toastr.errorToastr('No reports available from '+this.logform.form.value.frm_date + ' to '+ this.logform.form.value.to_date,'')}
        })
    }
    else if(this.Inc_type=='L'){
      // console.log(this.logform.form.value.logTypes)
      if(this.logform.form.value.logTypes=='1'){
        this.displayedColumns=[];
        this.displayedColumns=['Date','emp_name','act_type','activity'];
        this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
          this.get_incident_details=data;
          this.get_incident_details=this.get_incident_details.msg;
          this.dataSource=new MatTableDataSource(this.get_incident_details);
          if(this.get_incident_details.length > 0){}
           else{this.toastr.errorToastr('No reports available from '+this.logform.form.value.frm_date + ' to '+ this.logform.form.value.to_date,'')}
          })
      }
      else{
        this.displayedColumns=[];
        this.displayedColumns=['Date','emp_name','activity'];
        this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
          this.get_incident_details=data;
          this.get_incident_details=this.get_incident_details.msg;
          this.dataSource=new MatTableDataSource(this.get_incident_details);
          if(this.get_incident_details.length > 0){}
          else{this.toastr.errorToastr('No reports available from '+this.logform.form.value.frm_date + ' to '+ this.logform.form.value.to_date,'')}
          })
      }
    }
    else if(this.Inc_type=='C'){
      this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        this.dataSource=new MatTableDataSource(this.get_incident_details);
        if(this.get_incident_details.length > 0){}
        else{this.toastr.errorToastr('No reports available from '+this.logform.form.value.frm_date + ' to '+ this.logform.form.value.to_date,'')}
        })
    }
    else if(this.Inc_type=='H'){
      console.log(this.Inc_type);

      this.emergencyservice.global_service('0','/handover','inc_id='+this.logform.form.value.inc_name).pipe(map((x:any) => x.msg)).subscribe(data=>{
         if(data.length > 0){
          this.get_incident_details = data;
          this.dataSource=new MatTableDataSource(data);
         }
         else{
          this.toastr.errorToastr('No reports of handover available','')
         }
        })
    }
    else{
      this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        this.dataSource=new MatTableDataSource(this.get_incident_details);
        if(this.get_incident_details.length > 0){}
        else{this.toastr.errorToastr('No reports available from '+this.logform.form.value.frm_date + ' to '+ this.logform.form.value.to_date,'')}
        })
    }
  }
  board_submit(board_logForm:Form){
    this.get_incident_details.length=0;
    this.multi.length=0;

      // this.board_form.form.value.board_type = lalala_board[i]
      // console.log(this.board_form.form.value.board_type);

  //  switch(this.board_form.form.value.board_type)
   switch(this.board_form.form.value.board_type)
    {
      case "1": this.board_stats=this.board_form.form.value.board_type;
                this.displayedColumns=['inc_no','date','installation','coordinates','visibility','wind_speed','wind_direc','sea_state','temp','summary','status'];
                this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe(data=>{
                  this.get_incident_details=data;
                  this.get_incident_details=this.get_incident_details.msg;
                  this.dataSource=new MatTableDataSource(this.get_incident_details);
                  })
                 break;

      case "2": this.board_stats=this.board_form.form.value.board_type;
                this.displayedColumns=['Name','type','from','etd','to','eta','remarks'];
                this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe(data=>{
                this.get_incident_details=data;
                this.get_incident_details=this.get_incident_details.msg;
                this.dataSource=new MatTableDataSource(this.get_incident_details);
              })
               break;

      case "3": this.board_stats=this.board_form.form.value.board_type;
                  this.displayedColumns=['call Sign','type','from','etd','to','eta','remarks'];
                  this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe(data=>{
                  this.get_incident_details=data;
                  this.get_incident_details=this.get_incident_details.msg;
                  this.dataSource=new MatTableDataSource(this.get_incident_details);
                 })
                break;

    case "4":
            this.spinner.show();
              this.board_stats=this.board_form.form.value.board_type;
                // this.displayedColumns=['Date','category','Time','value'];
                this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe((data)=>{
                  // this.spinner.show();
                  this.get_incident_details=data;
                  this.get_incident_details=this.get_incident_details.msg;
                for (const [key, value] of Object.entries(this.get_incident_details)) {
                   this.multi.push(value)
                }
                console.log(this.multi);

                setTimeout(() => {
                  for(let i=0; i<this.multi.length; i++){
                    for(let j=0; j<this.multi[i].length; j++){
                      $('#prob_tr_'+this.multi[i][j].prob_cat_id+'_'+this.multi[i][j].serial).text(this.multi[i][j].value);
                    }}
                  this.dataSource=new MatTableDataSource(this.get_incident_details);
                  this.spinner.hide();
                }, 5000);
               })
              break;

      case "5": this.board_stats=this.board_form.form.value.board_type;
                this.displayedColumns=['full_name','employer','emp_condition','location_name','time'];
                this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe(data=>{
                this.get_incident_details=data;
                this.get_incident_details=this.get_incident_details.msg;

                this.dataSource=new MatTableDataSource(this.get_incident_details);
               })
              break;

      case "6": this.board_stats=this.board_form.form.value.board_type;
              this.displayedColumns=['time','destination','mode_of_transport','pob_remaining','remarks'];
              this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe(data=>{
              this.get_incident_details=data;
              this.get_incident_details=this.get_incident_details.msg;
              this.dataSource=new MatTableDataSource(this.get_incident_details);
             })
            break;
      case "7": this.board_stats=this.board_form.form.value.board_type;
            this.displayedColumns=['time','situation_status','resource_assigned'];
            this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe(data=>{
            this.get_incident_details=data;
            this.get_incident_details=this.get_incident_details.msg;
            this.dataSource=new MatTableDataSource(this.get_incident_details);
           })
          break;

      case "8":this.board_stats=this.board_form.form.value.board_type;
            this.displayedColumns=['op_period_from','op_period_to','obj_general','people','assets','environment','reputation','awareness'];
            this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+this.board_form.form.value.board_type).subscribe(data=>{
              console.log(data);

              this.get_incident_details=data;
              this.get_incident_details=this.get_incident_details.msg;
              this.dataSource=new MatTableDataSource(this.get_incident_details);
             })
            break;

      case "Consolidated": this.board_stats=this.board_form.form.value.board_type;
       var _board = ["1","2","3","4","5","6","7","8"]
      for(let i = 0; i < _board.length; i++){
          this.loadAllData(_board[i]);
        }
      break;
    }
  // }

  }

  loadAllData (id:any) {
    switch(id)
  {
    case "1":
              this.displayedColumns1=['inc_no','date','installation','coordinates','visibility','wind_speed','wind_direc','sea_state','temp','summary','status'];
              this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe(data=>{
                this.get_incident_details1=data;
                this.get_incident_details1=this.get_incident_details1.msg;
                this.dataSource1=new MatTableDataSource(this.get_incident_details1);
                })
               break;

    case "2":
              this.displayedColumns2=['Name','type','from','etd','to','eta','remarks'];
              this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe(data=>{
              this.get_incident_details2=data;
              this.get_incident_details2=this.get_incident_details2.msg;
              this.dataSource2=new MatTableDataSource(this.get_incident_details2);
            })
             break;

    case "3":
                this.displayedColumns3=['call Sign','type','from','etd','to','eta','remarks'];
                this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe(data=>{
                this.get_incident_details3=data;
                this.get_incident_details3=this.get_incident_details3.msg;
                this.dataSource3=new MatTableDataSource(this.get_incident_details3);
               })
              break;

  case "4":
          this.spinner.show();

              // this.displayedColumns=['Date','category','Time','value'];
              this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe((data)=>{
                // this.spinner.show();
                this.get_incident_details=data;
                this.get_incident_details=this.get_incident_details.msg;
              for (const [key, value] of Object.entries(this.get_incident_details)) {
                 this.multi.push(value)
              }
              // console.log(this.multi);

              setTimeout(() => {
                for(let i=0; i<this.multi.length; i++){
                  for(let j=0; j<this.multi[i].length; j++){
                    $('#prob_tr_'+this.multi[i][j].prob_cat_id+'_'+this.multi[i][j].serial).text(this.multi[i][j].value);
                  }}
                this.dataSource=new MatTableDataSource(this.get_incident_details);
                this.spinner.hide();
              }, 5000);
             })
            break;

    case "5":
              this.displayedColumns4=['full_name','employer','emp_condition','location_name','time'];
              this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe(data=>{
              this.get_incident_details4=data;
              this.get_incident_details4=this.get_incident_details4.msg;

              this.dataSource4=new MatTableDataSource(this.get_incident_details4);
             })
            break;

    case "6":
            this.displayedColumns5=['time','destination','mode_of_transport','pob_remaining','remarks'];
            this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe(data=>{
            this.get_incident_details5=data;
            this.get_incident_details5=this.get_incident_details5.msg;
            this.dataSource5=new MatTableDataSource(this.get_incident_details5);
           })
          break;
    case "7":
          this.displayedColumns6=['time','situation_status','resource_assigned'];
          this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe(data=>{
          this.get_incident_details6=data;
          this.get_incident_details6=this.get_incident_details6.msg;
          this.dataSource6=new MatTableDataSource(this.get_incident_details6);
         })
        break;
    case "8":
      this.displayedColumns7=['op_period_from','op_period_to','obj_general','people','assets','environment','reputation','awareness'];
          this.emergencyservice.global_service('0','/board_report','inc_id='+this.board_form.form.value.inc_name+'&board_id='+id).subscribe(data=>{
          this.get_incident_details7=data;
          this.get_incident_details7=this.get_incident_details7.msg;
          this.dataSource7=new MatTableDataSource(this.get_incident_details7);
         })
        break;
  }
  }
  // For priniting as pdf
  export(){
    this.Inc_type=this.route.snapshot.params['inc_type'];
    var board = this.Inc_type=='B' ? this.board_form.form.value.board_type : '';
    var log = this.Inc_type=='L' ? this.logform.form.value.logTypes : '';
    var element_id = this.Inc_type=='I' ? 'IncidentdivToPrint' : (this.Inc_type=='A' ? 'ActivationdivToPrint' : (this.Inc_type=='C' ? 'LiveLogdivToPrint' : (this.Inc_type=='B' ? 'BoarddivToPrint_'+board : (this.Inc_type=='L' ? 'LogSheetdivToPrint_'+log : (this.Inc_type=='CL' ? 'CalldivToPrint' : 'HandOverdivToPrint')))))
    var dt_pr = this.Inc_type == 'B' || this.Inc_type == 'H'? '' : '  From: ' + this.logform.form.value.frm_date + ' -- To: ' + this.logform.form.value.to_date;
    this.divToPrint = document.getElementById(element_id);
  console.log(this.divToPrint);
        this.WindowObject = window.open('', 'Print-Window');
        this.WindowObject.document.open();
        this.WindowObject.document.writeln('<!DOCTYPE html>');
        this.WindowObject.document.writeln('<html><head><title></title><style type="text/css">');
        this.WindowObject.document.writeln('@media print { .center { text-align: center;}' +
                '                                         .inline { display: inline; }' +
                '                                         .underline { text-decoration: underline; }' +
                '                                         .left { margin-left: 315px;} ' +
                '                                         .right { margin-right: 375px; display: inline; }' +
                '                                          table { border-collapse: collapse; font-size: 10px;}' +
                '                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}' +
                '                                           th, td { }' +
                '                                         .border { border: 1px solid black; } ' +
                '                                         .bottom { bottom: 5px; width: 100%; position: fixed; } '+
                '                                           footer { position: fixed; bottom: 0;text-align: center; }' +
                '                                         td.dashed-line { border-top: 1px dashed gray; } } </style>');
          this.WindowObject.document.writeln('</head><body onload="window.print()">');
          this.WindowObject.document.writeln('<center><img src="/assets/images/logoWhit.png" alt="">'+
          '<h3>Virtual Emergency Response Management System</h3>'+
          '<h5>'+this.Report_type+ dt_pr + '</h5></center>');
          this.WindowObject.document.writeln(this.divToPrint.innerHTML);
          this.WindowObject.document.writeln('<footer><small>This is an electronically generated report, hence does not require any signature</small></footer>');
          this.WindowObject.document.writeln('</body></html>');
          this.WindowObject.document.close();
        setTimeout(() => {
          console.log("CLose");
          this.WindowObject.close();
        }, 100);
    }
      // For downloading as excel
    importAsXlsx(){
      if(this.board_stats!='4'){
      this.matTableExporter.exportTable('xlsx', {fileName:this.Report_type, sheet: 'sheet_name'});
      }
      else{
        let data=document.getElementById('prob_table');
        var fp=XLSX.utils.table_to_book(data,{sheet:'Sheet1'});
        XLSX.write(fp,{
          bookType:'xlsx',
          type:'base64'
        });
        XLSX.writeFile(fp,'BoardProbReport.xlsx');
      }
      }

      getTier(){
        this.emergencyservice.global_service('0','/tier',"null").pipe(map((x:any) => x.msg)).subscribe(res =>{
          this.get_tier = res;
        })
      }

      getToday(){//For Getting Date Only
        return new Date().toISOString().substring(0,10);
      }

      fetchdata(){

            this.emergencyservice.global_service('0','/handover','inc_id='+this.logform.form.value.inc_name).pipe(map((x:any) => x.msg)).subscribe(res => {
              console.log(res);

            })


        }


}
