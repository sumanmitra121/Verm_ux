import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { MatTableExporterDirective } from 'mat-table-exporter';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import 'jspdf-autotable'
@Component({
  selector: 'app-reportdatapool-details',
  templateUrl: './reportdatapool-details.component.html',
  styleUrls: ['./reportdatapool-details.component.css']
})
export class ReportdatapoolDetailsComponent implements OnInit {
  show:boolean=true;
  @ViewChild(MatTableExporterDirective) matTableExporter!: MatTableExporterDirective;
  @ViewChild('logForm') logform!:NgForm;
  @ViewChild('LogForm') board_form!:NgForm;
  displayedColumns: string[] =[];
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) matsort!: MatSort;
dataSource= new MatTableDataSource();
  headername:any='Form & Checklist';
  icon:any='fa-list-ul';
  Inc_id:any;
  Inc_type:any;
  get_allIncident:any=[];
  get_incident_details:any=[];
  board_stats:any;
  WindowObject:any;
  divToPrint:any;
  Report_type:any;
  print_incidentStatus:any=[];
  constructor(private route:ActivatedRoute,private emergencyservice:VirtualEmergencyService) { }

  ngOnInit(): void {
    this.Inc_type=this.route.snapshot.params['inc_type'];
    this.Report_type = this.Inc_type=='I' ? 'Incident Reports' : (this.Inc_type=='A' ? 'Activation Reports' : (this.Inc_type=='C' ? 'Live Logs' : (this.Inc_type=='B' ? 'Boards' : (this.Inc_type=='L' ? 'Log Sheets' : (this.Inc_type=='CL' ? 'Call Logger' : '')))))
    if(this.Inc_type=='B' || this.Inc_type=='C' || this.Inc_type=='L' || this.Inc_type=='CL'){
      this.emergencyservice.global_service('0','/get_all_incident',null).subscribe(data=>{
        // console.log(data);
         this.get_allIncident=data;
         this.get_allIncident=this.get_allIncident.msg;

      })
    }
  }
  form_submit(logForm:Form){
    //  console.log(this.logform.form.value.logTypes );
     this.print_incidentStatus.length=0;
     this.get_incident_details.length=0;
     var api_url=this.Inc_type=='A' ? '/activation_report' : (this.Inc_type=='I' ? '/incident_report': (this.Inc_type=='C' ? '/chat_report' : (this.Inc_type=='CL' ? '/call_log_report' : '' )))
     this.displayedColumns=this.Inc_type=='A' ? ['Date','incident_name','team_name','Status','created_by'] : (this.Inc_type=='I' ?  ['Incident_no','Incident_type','Incident_name', 'Incident_location','Initial_tier','Final_tier','event_description','remarks','created_at','Created_By','close_date','Closed_by','Closed_at','approved_by','approved_at'] : (this.Inc_type=='C' ? ['Date','emp_name','chat','file'] : (this.Inc_type=='CL' ? ['Date','ref_no','made_by','made_to','received_by','call_details'] : [])))
     if(this.Inc_type=='I' || this.Inc_type=='A' ){
     this.emergencyservice.global_service('0',api_url,'frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
      this.get_incident_details=data;
      this.get_incident_details=this.get_incident_details.msg;
      this.dataSource=new MatTableDataSource(this.get_incident_details);
      })
    }
    else if(this.Inc_type=='L'){
      if(this.logform.form.value.logTypes=='1'){
        this.displayedColumns=[];
        this.displayedColumns=['Date','emp_name','act_type','activity'];
        this.emergencyservice.global_service('0','/autolog_report','inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
          this.get_incident_details=data;
          this.get_incident_details=this.get_incident_details.msg;
          this.dataSource=new MatTableDataSource(this.get_incident_details);
          })
      }
      else{
        this.displayedColumns=[];
        this.displayedColumns=['Date','emp_name','activity'];
        this.emergencyservice.global_service('0','/manuallog_report','inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
          this.get_incident_details=data;
          this.get_incident_details=this.get_incident_details.msg;
          this.dataSource=new MatTableDataSource(this.get_incident_details);
          })
      }
    }
    else if(this.Inc_type=='C'){
      this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        this.dataSource=new MatTableDataSource(this.get_incident_details);
        for(let i=0;i<this.get_incident_details.length;i++){
          this.print_incidentStatus.push([
            this.get_incident_details[i].chat_dt,
            this.get_incident_details[i].emp_name,
            this.get_incident_details[i].chat,
            this.get_incident_details[i].file
          ])
        }
        })
    }
    else{
      this.emergencyservice.global_service('0',api_url,'inc_id='+this.logform.form.value.inc_name+'&frm_dt='+this.logform.form.value.frm_date + '&to_dt='+this.logform.form.value.to_date).subscribe(data=>{
        this.get_incident_details=data;
        this.get_incident_details=this.get_incident_details.msg;
        this.dataSource=new MatTableDataSource(this.get_incident_details);

        })
    }
  }
  board_submit(board_logForm:Form){
    this.get_incident_details.length=0;
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
    }

  }
  // For priniting as pdf
  export(){
    this.Inc_type=this.route.snapshot.params['inc_type'];
    var board = this.Inc_type=='B' ? this.board_form.form.value.board_type : '';
    var log = this.Inc_type=='L' ? this.logform.form.value.logTypes : '';
    var element_id = this.Inc_type=='I' ? 'IncidentdivToPrint' : (this.Inc_type=='A' ? 'ActivationdivToPrint' : (this.Inc_type=='C' ? 'LiveLogdivToPrint' : (this.Inc_type=='B' ? 'BoarddivToPrint_'+board : (this.Inc_type=='L' ? 'LogSheetdivToPrint_'+log : (this.Inc_type=='CL' ? 'CalldivToPrint' : '')))))
    this.divToPrint = document.getElementById(element_id);

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
          '<h5>'+this.Report_type+'  From: ' + this.logform.form.value.frm_date + ' -- To: ' + this.logform.form.value.to_date + '</h5></center>');
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
      this.matTableExporter.exportTable('xlsx', {fileName:this.Report_type, sheet: 'sheet_name'});
      }
  }
