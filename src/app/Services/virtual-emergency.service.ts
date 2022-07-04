import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { io, Socket }  from 'socket.io-client';//For Socket.io-client implementation
import { observable, Observable, ReplaySubject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from '../CommonDialogAlert/dialogalert/dialogalert.component';
import { IncDetails } from '../Model/IncDetails';
@Injectable({
  providedIn: 'root'
})
export class VirtualEmergencyService {
  public _incDetails= new ReplaySubject<IncDetails>(1); 
  currentIncdents$ = this._incDetails.asObservable();
  private socket: Socket;
  public url = 'http://192.168.1.244:3000'; 
  // public url = 'https://vermapi.opentech4u.co.in';



  // socket:any;
//  url:any='http://localhost:3000';
//  readonly url:any='https://vermapi.opentech4u.co.in';
 constructor(public dialog:MatDialog,private http:HttpClient) {
  // this.socket = io(this.url);
  this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
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
   //For getting data from socket.io server

  //  public getMessages = () => {
  //    return new Observable((observer)=>{
  //      this.socket.on('news',(news:Observable<any>)=>{
  //            observer.next(news);
              
  //      })
  //    })
  //  }


  //For getting employee list for showing in side pannel in live log
    get_logged_employee(eventname:any){
      return new Observable((observer)=>{
        this.socket.on(eventname,(news:Observable<any>)=>{
              observer.next(news);
              //  console.log(news);     
        })
      })
    }


  // public  get_old_messages(){
  //     return new Observable((observer)=>{
  //       this.socket.listen('oldMessage',(data:Observable<any>)=>{
  //         console.log(data)
  //         observer.next(data);
             
  //       })
  //     })
  //   }


  //For Listening api for chats
   listen(eventname:any){
    //  console.log(eventname);   
    return new Observable((observer)=>{
      this.socket.on(eventname,(news:Observable<any>)=>{
            observer.next(news);
             // console.log(news);     
      })
    })
   }
   //For Sending data to socket.io server
   emit(eventname:any,data:any){
         this.socket.emit(eventname,data);
   }

   joinRoom(data:any): void {
    //  console.log(data);
     
    this.socket.emit('join', data);
  }

  newUserJoin(){
  
      this.socket.on('newUserJoined', (data:any) => {
        // console.log(data);
      
      })
   
  }

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


  setcurrInc(_inc:IncDetails){return this._incDetails.next(_inc);}
 
  }

