import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild ,AfterViewInit, ElementRef} from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { global_url_test } from '../../../app/url';
import '../../../assets/js/external_api.js';
declare var JitsiMeetExternalAPI:any;
@Component({
  selector: 'app-audio-video-conference',
  templateUrl: './audio-video-conference.component.html',
  styleUrls: ['./audio-video-conference.component.css']
})
export class AudioVideoConferenceComponent implements OnInit,AfterViewInit {
  url=global_url_test.project_URL;
   name:any=localStorage.getItem('Emp_name');
   email:any=localStorage.getItem('Email');
  // Jitsi////
  room:any;
  user:any;
  api:any;
  domain:any="meet.jit.si";
  // domain:any="localhost:4200";
  options:any;
   video_slash:boolean=false;
   video_toggle:any;
  //End//////
  @ViewChild('logForm') LogForm!:NgForm;
  @ViewChild('close_modal') close_modal!:ElementRef;

  icon:any='fa-file-video-o'; 
   headername:any='Audio / Video Conference';
   //client = ZoomMtgEmbedded.createClient();
   meetingSDKElement:any;
   host_modal:any;
   role:any;
  //  api_key:any="u_XCpma6SSmtDSn5Kqd4lw";
   api_key:any="g23th21-QUKS9UJtg45S_g";
  //  secret_key:any="uDAUimbWnYKhKEB8SmtQI0vJANArE9UsMfVH";
  secret_key:any="sOR9LM0v89ffZeo4zjtcpwa76agZAW8K2ARS";
   signature:any;
  constructor(
    private emergencyService: VirtualEmergencyService,
    private router: Router,
    private spinner: NgxSpinnerService) { }   

  ngOnInit(): void {
    var alpha=['A','B','C','D','E','F','G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '1','2','3','4','5','6','7','8','9','0',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v','w','x','y','z',];
    var a=alpha[Math.floor(Math.random()*62)]
    var b=alpha[Math.floor(Math.random()*62)]
    var c=alpha[Math.floor(Math.random()*62)]
    var d=alpha[Math.floor(Math.random()*62)]
    var e=alpha[Math.floor(Math.random()*62)]
    var f=alpha[Math.floor(Math.random()*62)]
    var g=alpha[Math.floor(Math.random()*62)]
    var sum=a+b+c+d+e+f+g;
   this.room=sum;
   this.user={name:localStorage.getItem('Emp_name')?localStorage.getItem('Emp_name') : 'Test'}


    // this.meetingSDKElement = document.getElementById('meetingSDKElement');
    // this.meetingSDKElement.style.display="block";
    // this.client.init({
    //   debug: true,
    //   zoomAppRoot: this.meetingSDKElement,
    //   language: 'en-US',
    //   customize: {
    //     meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
    //     toolbar: {
    //       buttons: [
    //         {
    //           text: 'Custom Button',
    //           className: 'CustomButton',
    //           onClick: () => {
    //             console.log('custom button');
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
    // this.client.join({
    //   apiKey: "nV0aWBNQWZTTUhWh5xlhRzuXB535cpEB4wn3",
     
    //   signature:"blYwYVdCTlFXWlRUVWhXaDV4bGhSenVYQjUzNWNwRUI0d24zLjY5MDAxMzAzOTYuMTY0MTg5NzY3ODI5Ni4xLkNZM2pTYXJlVjBPRzBKMlVBU28rdHIyc3VNNHFJeUc5WWt3NnFwazFSeDA9",
    //   meetingNumber: "6900130396",
    //   password: "TYpz3t",
    //   userName: "Suman Mitra",   
    // })

  }

  ngAfterViewInit(){}

  handleClose=()=>{
   console.log("handleCLose");
  //  this.router.navigate(['/Audio_Video']);
   
  }

  handleParticipantLeft = async(participant:any)=>{
    console.log("handleParticipantLeft",participant);
    const data=await this.getParticipants()

  }
  handleParticipantJoined=async(participant:any)=>{
    console.log("handleParticipantLeft",participant);
    const data=await this.getParticipants()


  }
  videoConferenceJoined=async(participant:any)=>{
    console.log(participant); 
    const data=await this.getParticipants()

  }

  videoConferenceLeft=()=>{
  //  this.route.navigate
  console.log("videoConferenceLeft");
  this.api.dispose();
  //  location.reload();
}
  handleAudioMuteStatusChanged=(audio:any)=>{
  console.log("handleAudioMuteStatusChanged",audio);

  } 
handleVideoMuteStatusChanged=(video:any)=>{}



  getParticipants(){
   return new Promise((resolve,reject)=>{
     setTimeout(() => {
        resolve(this.api.getParticipantsInfo())
     }, 500);
   })
  }
  // executeCommand(v:any){
  //   this.api.executeCommand(v);
  //   if(v=='hangup'){
  //     console.log("Hangup");
  //   }
  //   if(v=='toggleAudio'){
  //     this.isAudioMuted=!this.isAudioMuted;
  //   }
  //   if(v=='togglevideo'){
  //     this.isVideoMuted=!this.isVideoMuted;
  //   }
  // }

  join_video(join_room:any){
    // console.log(join_room.substring(join_room.lastIndexOf('/')+1));

  //   if(join_room!='') {
  //     this.spinner.show();
  //    this.options={
  //     roomName:join_room.substring(join_room.lastIndexOf('/')+1),
  //     width:1200,
  //     height:500,
  //     configOverWrite:{
  //       proJoinPageEnable:false,
  //     },
  //     interfaceConfigOverWrite:{
  //       TILE_VIEW_MAX_COLUMNS:100
  //     },parentNode:document.querySelector('#jist-iframe_join'),
  //     userInfo:{
  //       displayName:this.user.name,
  //       email:localStorage.getItem('Email'),
  //     }
  //     }
  //   this.api=new JitsiMeetExternalAPI(this.domain,this.options);
  //   this.api.addEventListeners({
  //     redyToClose:this.handleClose,
  //     participantLeft:this.handleParticipantLeft,
  //     participantJoined:this.handleParticipantJoined,
  //     videoConferenceJoined:this.videoConferenceJoined,
  //     videoConferenceLeft:this.videoConferenceLeft,
  //     audioMuteStatusChanged:this.handleAudioMuteStatusChanged,
  //     videoMuteStatusChanged:this.handleVideoMuteStatusChanged
  //   })
  //   this.spinner.hide();
  // }
  // else{

  // }
  }

  Host_video(){
    this.spinner.show();
    this.options={
      roomName:this.room,
      width:1180,
      height:500,
      configOverWrite:{
        proJoinPageEnable:false,
        // startWithAudioMuted: true 
      },
      interfaceConfigOverWrite:{
        TILE_VIEW_MAX_COLUMNS:100
      },parentNode:document.querySelector('#jist-iframe'),
      userInfo:{
        displayName:this.user.name,
        email:localStorage.getItem('Email'),
      }
}
    this.api=new JitsiMeetExternalAPI(this.domain,this.options);
    this.api.addEventListeners({
      // videoMuteStatusChanged:,
      redyToClose:this.handleClose,
      // redyToClose:this.router.navigate(['/Audio_Video']),
      participantLeft:this.handleParticipantLeft,
      participantJoined:this.handleParticipantJoined,
      videoConferenceJoined:this.videoConferenceJoined,
      videoConferenceLeft:this.videoConferenceLeft,
      audioMuteStatusChanged:this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged:this.handleVideoMuteStatusChanged 
    })
    // this.api.executeCommand('toggleVideo');
    this.spinner.hide();
  }
  toggle_video(event:any){
     this.video_slash=event.target.checked==true ? false:true;
  }
  logSubmit(logForm:any){
    //  console.log(this.LogForm.form.value.meet_no);
    //  this.get_signature(this.api_key,this.secret_key,this.LogForm.form.value.meet_no,this.role,this.LogForm.form.value.password,this.LogForm.form.value.user_name);
    console.log(logForm.value.meet_url); 
    if(logForm.invalid){
    }
    else{
      var name=logForm.value.user_name == '' ? this.name :  logForm.value.user_name;
      window.open(this.url+"/"+logForm.value.meet_url.substring(logForm.value.meet_url.lastIndexOf('/')+1)+"/"+name+"/"+this.email,'_blank');
      // this.options={
      //   roomName:logForm.value.meet_url.substring(logForm.value.meet_url.lastIndexOf('/')+1),
      //   width:1180,
      //   height:500,
      //   configOverWrite:{
      //     // proJoinPageEnable:false,
      //     // proJoinPageEnable:false,
      //     prejoinPageEnabled: false
      //   },
      //   interfaceConfigOverWrite:{
      //     TILE_VIEW_MAX_COLUMNS:100
      //   },parentNode:document.querySelector('#jist-iframe_join'),
      //   userInfo:{
      //     displayName:logForm.value.user_name!='' ? logForm.value.user_name : this.user.name,
      //     email:localStorage.getItem('Email'),
      //   }
      //   }
      // this.api=new JitsiMeetExternalAPI(this.domain,this.options);
      // this.api.addEventListeners({
      //   redyToClose:this.handleClose,
      //   participantLeft:this.handleParticipantLeft,
      //   participantJoined:this.handleParticipantJoined,
      //   videoConferenceJoined:this.videoConferenceJoined,
      //   videoConferenceLeft:this.videoConferenceLeft,
      //   audioMuteStatusChanged:this.handleAudioMuteStatusChanged,
      //   videoMuteStatusChanged:this.handleVideoMuteStatusChanged
      // })
      logForm.reset();
     
    }
  }
  logjoin(logForm:Form){
    console.log(logForm);
  }
  //get_signature(api_key:any,secret:any,meet_no:any,role:any,password:any,userName:any){
  //      this.emergencyService.global_service('0','/signature','apiKey='+api_key+'&apiSecret='+secret+'&meetingNumber='+meet_no+'&role='+role).subscribe(data=>{
  //       console.log(data);
  //       this.signature=data;
  //       console.log(this.signature.msg);
  //       if(this.signature.suc==1){
  //        this.meetingSDKElement = document.getElementById('meetingSDKElement');
  //        this.client.init({
  //          debug: true,
  //          zoomAppRoot: this.meetingSDKElement,
  //          language: 'en-US',
  //          customize: {
  //            meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
  //            toolbar: {
  //              buttons: [
  //                {
  //                  text: 'Custom Button',
  //                  className: 'CustomButton',
  //                  onClick: () => {
  //                    console.log('custom button');
  //                  }
  //                }
  //              ]
  //            }
  //          }
  //        });
  //      this.client.join({
  //            apiKey: api_key,
  //            signature: this.signature.msg,
  //                 meetingNumber: meet_no,
  //            password: password,
  //            userName:userName,   
  //          })
  //       }
  //       else{

  //       }
  //      })
  //}
  open_another_tab(){

  }
}
