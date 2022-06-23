import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import '../../../../../assets/js/external_api.js';
declare var JitsiMeetExternalAPI:any;
@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {
  room:any;
  user:any;
  name:any;
  email:any;
  options:any;
  domain:any="meet.jit.si";
  api:any;
 
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.room=this.route.snapshot.params['room_id'];
    this.name=this.route.snapshot.params['name'];
    this.email=this.route.snapshot.params['email'];
   this.user={name: this.name};
       this.options={
        height:714,
      roomName:this.room,
      configOverWrite:{
        proJoinPageEnable:false,
        startWithAudioMuted: false,       
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
      // redyToClose:this.handleClose,
      participantLeft:this.handleParticipantLeft,
      participantJoined:this.handleParticipantJoined,
      videoConferenceJoined:this.videoConferenceJoined,
      videoConferenceLeft:this.videoConferenceLeft,
      audioMuteStatusChanged:this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged:this.handleVideoMuteStatusChanged
    })
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
  //   this.api.executeCommand('startRecording', {
  //     mode: 'file',
  //     dropboxToken: 'MyToken',
  // });
    const data=await this.getParticipants()

  }

  videoConferenceLeft=()=>{
  this.api.dispose();
  window.close();
}
  handleAudioMuteStatusChanged=(audio:any)=>{

  } 
handleVideoMuteStatusChanged=(video:any)=>{};

getParticipants(){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
       resolve(this.api.getParticipantsInfo())
    }, 500);
  })
 }
}
