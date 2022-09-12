import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { from, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';
import { IncDetails } from 'src/app/Model/IncDetails';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
declare var $:any;
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  _temp_unit:any;
  _casualty_observeable!:Subscription;
  _evacuation_observeable!:Subscription;
  _event_observable!:Subscription;
 _min:number = 0;

  headername:any='Dashboard';
  active_flag:any=localStorage.getItem('active_flag');
  icon:any='fa-tachometer';
  inc_visibility:any='';
  inc_sea_state:any='';
  inc_temparature:any='';
  wind_speed:any='';
  get_vessel_status:any=[];
  get_Incident_objectives:any=[];
  get_helicopter_status:any=[];
  get_casualty_status:any=[];
  get_evacuation_status:any=[];
  get_events_status:any=[];
  get_prob_status:any=[];
  from_ves:any;
  to_ves:any;
  ves_name:any;
  call_sign:any;
  from_heli:any;
  to_heli:any;
  teansport_mode:any;
  evacuation_time:any;
  event_resource:any;
  event_time:any;
  event_situation:any;
  inc_location:any;
  Inc_Name:any;
  global_inc:any=1;
  temp:any='';
  deg:any='';
  //For chat //
  storageArray: any = [];
  element: any;
  public messageText: any;
  li_select: any;
  //End //

  constructor(
    public dialog: MatDialog,
    private emergencyservice:VirtualEmergencyService,
    private router:Router,
    private spinner:NgxSpinnerService) {
    }
  ngOnInit(): void {
    this.emergencyservice.joinRoom({user:localStorage.getItem('Emp_name'),room:this.global_inc,emp_code:localStorage.getItem('Employee_id')});}
  go_to_boards(v:any){
    localStorage.setItem('id_create',v);
    this.router.navigate(['/Board']);
  }

getTooltipText(v:any,v1:any,v2:any,v3:any,v4:any,v5:any,mode:any){
  return  mode=='V' ? `Name :  ${v} (${v1})
          From-To:  ${v2} - ${v3}
          ETD-ETA:  ${v4} - ${v5}` : ( mode=='H' ? `Call Sign (Type) :  ${v} (${v1})
          From-To:  ${v2} - ${v3}
          ETD-ETA:  ${v4} - ${v5}` : ( mode=='C' ? `Full Name :  ${v}
          Employer:  ${v1}
          Condition:  ${v2}
          Time: ${v3}` : ( mode=='E' ? `Transportaion Mode : ${v}
          Time : ${v1}
          Pob Remaining : ${v2} ` :`Resource Assigned : ${v}
          Time : ${v1}
          Situation Status : ${v2}
          `)));
}
getIncStatus(_id:any){
  // this.spinner.show('inc_status');
  // this.emergencyservice.global_service('0','/inc_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
  //     this.inc_visibility = res.length > 0 ? res[0].visibility + res[0].visibility_unit : '';
  //     this.inc_sea_state=res.length > 0 ? res[0].sea_state : "";
  //     this.temp=res.length > 0 ? res[0].temp : '';
  //     this.wind_speed=res.length > 0 ? res[0].wind_speed + res[0].wind_speed_unit: '';
  //     this.spinner.hide('inc_status');
  //     this._temp_unit = res.length > 0 ?  res[0].temp_unit : '';
  // },error => {this.spinner.hide('inc_status');})
  // var dt = {
  //   inc_id:_id
  // };
this.emergencyservice.emit('inc_board',_id);
this.emergencyservice.listen('inc_board').pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.inc_visibility = res.length > 0 ? res[0].visibility + res[0].visibility_unit : '';
      this.inc_sea_state=res.length > 0 ? res[0].sea_state : "";
      this.temp=res.length > 0 ? res[0].temp : '';
      this.wind_speed=res.length > 0 ? res[0].wind_speed + res[0].wind_speed_unit: '';
      this.spinner.hide('inc_status');
      this._temp_unit = res.length > 0 ?  res[0].temp_unit : '';
  })
}
getVesselStatus(_id:any){
  // this.spinner.show('vessel_stats');
  // this.emergencyservice.global_service('0','/vessel_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
  //   this.get_vessel_status = res;
  //   this.spinner.hide('vessel_stats');
  // },error => {this.spinner.hide('vessel_stats');})
  this.emergencyservice.emit('vessel_board',_id);
  this.emergencyservice.listen('vessel_board').pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_vessel_status = res;
      // this.spinner.hide('vessel_stats');
    })
}
getHelicopterStatus(_id:any){
  // this.spinner.show('heli_stats');
  // this.emergencyservice.global_service('0','/helicopter_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
  //   this.get_helicopter_status = res;
  //   this.spinner.hide('heli_stats');
  // },error => {this.spinner.show('heli_stats');})
  this.emergencyservice.emit('helicopter_board',_id);
  this.emergencyservice.listen('helicopter_board').pipe(map((x:any) => x.msg)).subscribe(res=>{
    this.get_helicopter_status = res;
  })
}
getCasualtyStatus(_id:any){
 //For Showing Casualty Status
      // this.spinner.show('casualty_stats');
      // this.emergencyservice.global_service('0','/casualty','inc_id=' +_id).pipe(map((x:any) => x.msg),take(2)).subscribe(res=>{
      //   this.get_casualty_status.length=0;
      //   this._casualty_observeable =  from(res).pipe(take(2)).subscribe(dt =>{
      //   this.get_casualty_status.push(dt)
      //  })
      //  this.spinner.hide('casualty_stats');
      // },err =>{
      //   this.spinner.hide('casualty_stats');
      // })
      this.emergencyservice.emit('casualty',_id);
       this.emergencyservice.listen('casualty').pipe(map((x:any) => x.msg),take(2)).subscribe(res=>{
        this.get_casualty_status.length=0;
        //.log(res);

        this._casualty_observeable =  from(res).pipe(take(2)).subscribe(dt =>{
        this.get_casualty_status.push(dt)
       })
      })
}
getEvacuationStatus(_id:any){
  // this.spinner.show('evacuations');
  // this.emergencyservice.global_service('0','/evacuation_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
  //   this.get_evacuation_status.length = 0;
  //   this._evacuation_observeable =  from(res).pipe(take(2)).subscribe(dt =>{
  //   this.get_evacuation_status.push(dt)
  //    })
  //   this.spinner.hide('evacuations');
  // },err => {this.spinner.hide('evacuations');})
      this.emergencyservice.emit('evacuation_board',_id);
      this.emergencyservice.listen('evacuation_board').pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_evacuation_status.length = 0;
      this._evacuation_observeable =  from(res).pipe(take(2)).subscribe(dt =>{
      this.get_evacuation_status.push(dt);
       })
    })
}
getEventStatus(_id:any){
      // this.spinner.show('events');
      // this.get_events_status.length=0;
      // this.emergencyservice.global_service('0','/event_log_board','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
      //   this.get_events_status.length=0;
      //   this._event_observable = from(res).pipe(take(2)).subscribe(dt =>{
      //   this.get_events_status.push(dt);
      // })
      //    this.spinner.hide('events');
      // },error=>{this.spinner.hide('events')})
      this.emergencyservice.emit('event_log_board',_id);
      this.emergencyservice.listen('event_log_board').pipe(map((x:any) => x.msg)).subscribe(res=>{
        this.get_events_status.length=0;
        this._event_observable = from(res).pipe(take(2)).subscribe(dt =>{
        this.get_events_status.push(dt);
      })
    })
}
getProbStatus(_id:any){
      //  this.emergencyservice.global_service('0','/prob_board_dashboard','inc_id=' +_id).pipe(map((x:any) => x.msg)).subscribe(res=>{
      // this.get_prob_status=res;
      // })
      this.emergencyservice.emit('prob_board_dashboard',_id);
         this.emergencyservice.listen('prob_board_dashboard').pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_prob_status=res;
      })
}
getChat(_Id:any){
  this._min = 0;
   //check If ul has its child
   this.checkIfHasCHild();
  this.emergencyservice.global_service('0', '/oldMessage', 'min='+this._min+'&max=5'+'&id='+localStorage.getItem('Inc_id')).subscribe(data => {
    //data);
    //.log(data)
     this.storageArray.length = 0;
     this.storageArray = data;
     this.storageArray = this.storageArray.msg;
     for (let i = (this.storageArray.length-1); i >= 0; i--) {
       if (this.storageArray[i].employee_id != localStorage.getItem('Employee_id')) {
         this.element = document.createElement('li');
         if(this.storageArray[i].file_flag==0){
           this.element.innerHTML = "<b>" + this.storageArray[i].emp_name + "</b>" + "<br>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
         }
         else{
           if(this.storageArray[i].file.split(".")[1]=='pdf'){
           this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" + this.storageArray[i].chat_dt;
           }
           else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
           this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" + this.storageArray[i].chat_dt ;

           }
           else{
           this.element.innerHTML ="<b>" + this.storageArray[i].emp_name + "</b>" + "<br><br>"+"<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
           }
         }
         this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;';
         this.element.style.background = 'rgb(46 232 220 / 5%)';
         this.element.style.padding = '15px 30px';
         this.element.style.margin = '10px';
         this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
         this.element.style.width='50%';
         this.element.style.float='left';
         this.messageText = document.getElementById('message-list');
         this.messageText.appendChild(this.element);
       }
       else {
          this.element = document.createElement('li');
          if(this.storageArray[i].file_flag==0){
           this.element.innerHTML =  "<b>Me </b><br>" + this.storageArray[i].chat + "<br>" + "<br>" +this.storageArray[i].chat_dt;
         }
         else{
           if(this.storageArray[i].file.split(".")[1]=='pdf'){
           this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
           }
           else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
             this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;

           }
           else{
           this.element.innerHTML ="<b>Me </b><br><br>" +"<a  target='_blank' href="+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
           }
         }
         this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;';

         this.element.style.background = 'white';
         this.element.style.padding = '15px 30px';
         this.element.style.margin = '10px';
         this.element.style.border = '1px solid rgb(128 128 128 / 42%)';

         // this.element.style.textAlign = 'right';
         this.element.style.width='50%';

         this.element.style.float='right';
         this.messageText = document.getElementById('message-list');
         this.messageText.appendChild(this.element);
       }
     }
     this.li_select = document.querySelector(".chat-messages-show-list li:last-child")
     this.li_select.scrollIntoView({ behavior: 'smooth' });
   })
  //  this.loadMoreDataOnScroll(_Id)
  //    //Load data on scrolling in chat
  $('.verticalScroll').scroll(()=>{
    if($('.verticalScroll').scrollTop() == 0){
      this._min += 5;
      this.emergencyservice.global_service('0', '/oldMessage', 'min='+this._min+'&max=5'+'&id='+_Id).subscribe(data => {
       //.log(data)

        this.storageArray.length = 0;
        this.storageArray = data;
        this.storageArray = this.storageArray.msg;
        if(this.storageArray.length!=0){
        for (let i = 0; i <this.storageArray.length; i++) {
          if (this.storageArray[i].employee_id != localStorage.getItem('Employee_id')) {
            this.element = document.createElement('li');
            if(this.storageArray[i].file_flag==0){
              this.element.innerHTML = "<b>" + this.storageArray[i].emp_name + "</b>" + "<br>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
            }
            else{
              if(this.storageArray[i].file.split(".")[1]=='pdf'){
              this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" +this.storageArray[i].chat_dt;
              }
              else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
                this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" +this.storageArray[i].chat_dt;
              }
              else{
              this.element.innerHTML ="<b>" + this.storageArray[i].emp_name + "</b>" + "<br><br>"+"<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" +this.storageArray[i].chat_dt;
              }
            }
            this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;';
            this.element.style.background = 'rgb(46 232 220 / 5%)';
            this.element.style.padding = '15px 30px';
            this.element.style.margin = '10px';
            this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
            this.element.style.width='50%';
            this.element.style.float='left';
            this.messageText = document.getElementById('message-list');
            this.messageText.insertBefore(this.element, this.messageText.firstElementChild);
            // this.messageText.appendChild(this.element);


          }
          else {
            this.element = document.createElement('li');
            if(this.storageArray[i].file_flag==0){
              this.element.innerHTML =  "<b>Me </b><br>" + this.storageArray[i].chat + "<br>" + "<br>" +this.storageArray[i].chat_dt;
            }
            else{
              if(this.storageArray[i].file.split(".")[1]=='pdf'){
                this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" +this.storageArray[i].chat_dt;
              }
              else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
                this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" +this.storageArray[i].chat_dt;
              }
              else{
              this.element.innerHTML ="<b>Me </b><br><br>" +"<a  target='_blank' href="+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" +this.storageArray[i].chat_dt;
              }
            }
            this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;';
            this.element.style.background = 'white';
            this.element.style.padding = '15px 30px';
            this.element.style.margin = '10px';
            this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
            // this.element.style.textAlign = 'right';
            this.element.style.width='50%';
            this.element.style.float='right';
            this.messageText = document.getElementById('message-list');
            this.messageText.insertBefore(this.element, this.messageText.firstElementChild);
            // this.messageText.appendChild(this.element);
          }
        }
        $('.chat-messages-show-container').animate(
          { scrollTop: "520" }, 'slow');
      }
        else{

        }

      })
    }
  });
}

checkIfHasCHild(){
  this.messageText = document.getElementById('message-list');
    while (this.messageText.firstChild) {
      this.messageText.removeChild(this.messageText.firstChild);
    }
}
getIncidentObjectives(_id:any){
  // this.emergencyservice.global_service('0', '/inc_obj', 'inc_id=' + _id).pipe(map((x:any) => x.msg)).subscribe(res=>{
  //   this.get_Incident_objectives.length = 0;
  //   from(res).pipe(take(5)).subscribe(dt =>{
  //     //.log(res);
  //     this.get_Incident_objectives.push(dt);
  //   })
  //   })
  this.emergencyservice.emit('inc_obj',_id);
  this.emergencyservice.listen('inc_obj').pipe(map((x:any) => x.msg)).subscribe(res=>{
      this.get_Incident_objectives.length = 0;
      from(res).pipe(take(5)).subscribe(dt =>{
        //.log(res);
        this.get_Incident_objectives.push(dt);
      })
      })
}
getIncDetails(e:IncDetails){
    var dt={
      inc_id:e?.id
    };
      this.getIncStatus(dt);
      this.getVesselStatus(dt);
      this.getHelicopterStatus(dt);
      this.getIncidentObjectives(dt);
      this.getCasualtyStatus(dt);
      this.getEvacuationStatus(dt);
      this.getEventStatus(dt);
      this.getProbStatus(dt);
      this.getChat(e?.id);
}

openDialog(event:any){
  const disalogConfig = new MatDialogConfig();
    disalogConfig.disableClose = true;
    disalogConfig.autoFocus = false;
    disalogConfig.width = '100%';
    disalogConfig.data = {
      name:'SP',
      id:0,
      roles:event
    };
    const dialogref = this.dialog.open(DialogalertComponent, disalogConfig);
    dialogref.afterClosed().subscribe(dt =>{
      localStorage.setItem('_SHOW_POPUP','1')
      //.log(localStorage.getItem('_SHOW_POPUP'));
    })
}
getRolesResponsibility(event:any){
  if(Number(localStorage.getItem('_SHOW_POPUP')) == 0){
    this.openDialog(event);
  }
}

}
