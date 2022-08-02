import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $: any;
@Component({
  selector: 'app-add-team-status',
  templateUrl: './add-team-status.component.html',
  styleUrls: ['./add-team-status.component.css']
})
export class AddTeamStatusComponent implements OnInit {
  _alert:boolean=true;
    // Material datatable
    displayedColumns: string[] = ['From_date', 'To_date','label'];
    displayedColumns_employee: string[] = ['Employee_name','Employee_designation','Employee_status'];
    displayedColumns_history: string[] = ['From_date', 'To_date','created_at','created_by'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) matsort!: MatSort;
    dataSource= new MatTableDataSource();
    dataSource_employee= new MatTableDataSource();

  @ViewChild('logForm') LogForm!:NgForm;
  constructor(private emergencyservice:VirtualEmergencyService,private router:Router,public toastr:ToastrManager,private spinner: NgxSpinnerService,private datePipe: DatePipe) { }
  _alert_show:boolean =  true;
  value:any;
  x:any;
  ID:any=0;
  m:any;
  get_date:any=[];
  Team_Member:any=[];
   get_team:any=[];
   get_Employee:any=[];
   check_respond:any='';
  ngOnInit(): void {
     //For getting teams in select dropdown
    this.emergencyservice.global_service('0','/assign_team_dash',"null").subscribe(data=>{
      console.log(data);
      this.get_team=data;
      this.get_team=this.get_team.msg;
    })
    //Disabling previous Date
    $(function(){
      var dtToday = new Date();
      var month:any = dtToday.getMonth() + 1;
      var day:any = dtToday.getDate();
      var year = dtToday.getFullYear();
      if(month < 10)
          month = '0' + month.toString();
      if(day < 10)
          day = '0' + day.toString();
      var maxDate = year + '-' + month + '-' + day;
      $('#from_date').attr('min', maxDate);
      $('#to_date').attr('min', maxDate);
    });
    // End
  //Disabling  Dates based on From Date
    $('#from_date').on('change',()=>{
      var min=$('#from_date').val();
      if(min!=''){
        this.checkTeamRoaster(min);
      $('#to_date').attr('min', min);
      if($('#to_date').val()!=''){
        $('#populate').attr('disabled',false);
      }
      else{
        $('#populate').attr('disabled','disabled');
      }
    }
      else{
        $('#populate').attr('disabled','disabled');
      }
    })
    //Disabling button depend on dates
    $('#to_date').on('change',()=>{
      if($('#to_date').val()!=''){
        if($('#from_date').val()!=''){
          $('#populate').attr('disabled',false);
        }
        else{
          $('#populate').attr('disabled','disabled');
        }
      }
        else{
          $('#populate').attr('disabled','disabled');
        }
    })
    //End
    $('#eye_button').click(()=>{
      $('history').hide();
      this.view_employee();
    })


  //For Populate team roaster When Select team if any roaster had been made
   $('#team_id').on('change',()=>{
     this.spinner.show();
     if(this.LogForm.form.value.team_id!=''){
     this.emergencyservice.global_service('0','/team_status','id=' +this.LogForm.value.team_id).subscribe(data=>{
          this.Team_Member.length=0;
        this.Team_Member=data;
        this.Team_Member=this.Team_Member.msg;
        console.log(this.Team_Member);

        this.putdata(this.Team_Member);
       $('#more_btn').show();
      // this.emergencyservice.global_service('0','/get_max_frm_dt','team_id=' +this.LogForm.value.team_id).subscribe(data=>{
      //   this.get_date=data;
      //   this.get_date=this.get_date.msg;
      //   if(this.get_date[0].from_date==null){
      //     console.log(" date null");
      //   }
      //   else{
      //     var maximumdate=(this.get_date[0].from_date);
      //     $('#from_date').attr('min', maximumdate);
      //   }
      // })
        this.spinner.hide();
      })
     }
    else{
      console.log("team id is empty");
      $('#more_btn').hide();
      this.Team_Member.length=0;
     this.spinner.hide();
    }
    $('#from_date').val('');
    $('#to_date').val('');
    $('#Id').val('0');
    this.ID=0;
    $('#populate').attr('disabled','disabled');
   })
  //After hitting submit button
  $('#populate').on('click',()=>{
    var team_name=$('#team_id :selected').text();
     var dt={"user":localStorage.getItem('Email'),
        "from_date":$('#from_date').val(),
         "to_date": $('#to_date').val(),
        "team_id":this.LogForm.form.value.team_id,
         "id":this.LogForm.form.value.id,
        "team_name":team_name};
    this.emergencyservice.global_service('1','/team_status',dt).subscribe(data=>{
      // console.log(data);
      this.check_respond=data;
      if(this.check_respond.suc==1){
        $('#team_id').change();
         this.m=this.LogForm.form.value.id > 0?'Updation Successful':'Insertion Successfull';
         this.myFunction();
         $('#from_date').val('');
         $('#to_date').val('');
         $('#Id').val('0');
         this.ID=0;
         $('#populate').attr('disabled','disabled');
      }
      else{
          this.toastr.errorToastr('Something went wrong,Please try again later','Error!',{position:'top-center',animate:'slideFromTop',toastTimeout:50000});
         }
    })

  })
}

  //snackbar
   myFunction() {
    this.x = document.getElementById("snackbar")
    this.x.className = "show";
    setTimeout(()=>{ this.x.className = this.x.className.replace("show", ""); }, 10000);
}
  //After click on view employees button
  view_employee(){
    this.emergencyservice.global_service('0','/assign_team','id=' +this.LogForm.form.value.team_id).subscribe(data=>{console.log(data);
      this.get_Employee.length=0;
      this.get_Employee=data;
      this.get_Employee=this.get_Employee.msg;
      for(let i=0;i<this.get_Employee.length;i++){
         this.get_Employee[i].emp_status=this.get_Employee[i].emp_status=='O'?'ON':'OFF';
         this.get_Employee[i].user_type=this.get_Employee[i].user_type=='A'?'Admin':(this.get_Employee[i].user_type=='M'?'Approver':(this.get_Employee[i].user_type=='U'?'User':'Incident Commander'))
      }
      this.putdata_employee(this.get_Employee);
    })
  }
 //After click on history button
  view_history(){
    this.emergencyservice.global_service('0','/pre_team_status','id=' +this.LogForm.form.value.team_id).subscribe(data=>{console.log(data);
      this.get_Employee.length=0;
      this.get_Employee=data;
      this.get_Employee=this.get_Employee.msg;
      this.putdata_employee(this.get_Employee);
    })
  }
  //For showing history and employees details of specific team
 putdata_employee(v:any){
    this.dataSource_employee=new MatTableDataSource(v);
  }
  logSubmit(logForm:Form){}
  //For showing  details of specific team roaster
putdata(v:any){
  this.dataSource=new MatTableDataSource(v);
  this.dataSource.paginator=this.paginator;
  // this.dataSource.sort=this.matsort
}
//For getting row id on click on corrosponding row
get_details_corrosponding_id(id:any,from_date:any,to_date:any){
  // console.log(id);
   this.ID=id;
  var frm_date=this.datePipe.transform(from_date,'yyyy-MM-dd');
  var t_date=this.datePipe.transform(to_date,'yyyy-MM-dd');
  $('#from_date').val(frm_date);
  $('#to_date').val(t_date);
  $('#populate').removeAttr('disabled');
   window.scrollTo(0, 0);
}
checkTeamRoaster(_frm_dt:any){
  if(this.LogForm.value.team_id!=''){
    this.emergencyservice.global_service('0','/get_max_frm_dt','team_id=' +this.LogForm.value.team_id).pipe(map((x:any) => x.msg)).subscribe(data=>{
     console.log(data[0].from_date);
      this._alert = _frm_dt < data[0].from_date ? false : true;
         console.log(this._alert);
    })
  }
}
closeAlert(){this._alert = true;}
}

