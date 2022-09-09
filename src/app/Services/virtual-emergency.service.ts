import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { io, Socket }  from 'socket.io-client';//For Socket.io-client implementation
import {Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IncDetails } from '../Model/IncDetails';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class VirtualEmergencyService {
  public _incDetails= new Subject<IncDetails>();
  currentIncdents$ = this._incDetails.asObservable();
  private socket: Socket;

  // public url = 'http://192.168.1.244:3000';
  // public url = 'https://vermapi.opentech4u.co.in';
  public url = 'https://api.er-360.com';
  // socket:any;
  //  url:any='http://localhost:3000';
  //  readonly url:any='https://vermapi.opentech4u.co.in';
 constructor(private route:Router,public dialog:MatDialog,private http:HttpClient) {
  // this.socket = io(this.url);
  // this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  this.socket = io(this.url, {transports: ['polling']});
 }

  //For Adding new Offshore
  add_new_offshore(dt:any){
      return this.http.post(this.url+'/offshore',dt);
   }
   //For Getting Offshore details
   get_offshore(flag:any){
     return this.http.get(this.url+'/offshore?flag=' +flag);
   }
   //For getting Offshore depend on their ID
   get_offshore_depend_on_id(Id:any){
     return this.http.get(this.url+'/offshore?id=' +Id)
   }
  //For Adding new Incident
  add_new_Incident(dt:any){
    return this.http.post(this.url+'/incident',dt);
 }
 //For getting Incident
 get_incident(){
  return this.http.get(this.url+'/incident');
}
 //For getting Incident depend on their ID
 get_incident_depend_on_id(Id:any){
   return this.http.get(this.url+'/incident?id=' +Id)
 }
 //Common service
   global_service(flag:any, api_path:any, data:any){
     // FLAG : 1 -> POST || 0 -> GET
    if(flag > 0){
      // EX: data = {id: this.id, dt: this.dt};
      return this.http.post(this.url + api_path, data);
    }else{
      // EX: data = 'id=' + this.id + '&dt=' + this.dt
      var api_dt = data ? '?' + data : '';
      return this.http.get(this.url + api_path + api_dt);
    }
   }
  //For getting employee list for showing in side pannel in live log
    get_logged_employee(eventname:any){
       //.log(eventname)
      return new Observable((observer)=>{
         //.log(observer);
        this.socket.on(eventname,(news:Observable<any>)=>{
          //.log(eventname);
              observer.next(news);
        })
      })
    }



  //For Listening api for chats
   listen(eventname:any){
     //.log(eventname);
    return new Observable((observer)=>{
      this.socket.on(eventname,(news:Observable<any>)=>{
            observer.next(news);
      })
    })
   }
   //For Sending data to socket.io server
  emit(eventname:any,data:any){this.socket.emit(eventname,data);}
  joinRoom(data:any): void {this.socket.emit('join', data);}
  newUserJoin(){this.socket.on('newUserJoined', (data:any) => {})}
  sendMessage(data:any): void {
    this.socket.emit('message', data);
  }
  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  getStorage() {
    const storage  = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data:any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

  setcurrInc(_inc:IncDetails){this._incDetails.next(_inc);}

  routeToTheParticular(_type:any){
    switch(_type){
      case "BI": this.route.navigate(['/Board']);break;//Incident Board
      case "BV": this.route.navigate(['/Board']);break;//VESSEL STATUS
      case "BH": this.route.navigate(['/Board']);break;//Helicopter Status
      case "BP": this.route.navigate(['/Board']);break;//Prob Status
      case "BC": this.route.navigate(['/Board']);break;//Casualty Status
      case "BE": this.route.navigate(['/Board']);break;//Evacuation Status
      case "BL": this.route.navigate(['/Board']);break;//Events Log
      case "I": this.route.navigate(['/AddIncident']);break;//Create Incident
      case "A": this.route.navigate(['/ActivationModule']);break;//Activation Module
      case "R": this.route.navigate(['/addRepository']);break;//Repository Module
      case "F": this.route.navigate(['/FormsCheckList']);break;//Forms & Check List
      case "AN":this.route.navigate(['/admin/dashboard']);break;
      default:break;
    }
  }
  clearNotifications(_id:any,_activity:any){
  this.global_service('1','/notification',{id:+_id}).subscribe(res =>{
    //.log(res);

    this.routeToTheParticular(_activity);
  })
  }
  disconnectSocket(){this.socket.disconnect();}
  getWindDirection(){
    return this.http.get('../../assets/JSON/windDirection.json');
  }
  }

