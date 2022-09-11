import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Notifiactions } from 'src/app/Model/Notifiactions';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-Notification',
  templateUrl: './Notification.component.html',
  styleUrls: ['./Notification.component.css']
})
export class NotificationComponent implements OnInit {
  _u_type:any= localStorage.getItem('User_type');
  displayedColumns: string[] = ['Notifications'];
  dataSource = new MatTableDataSource<Notifiactions[]>();
  constructor(private _serve:VirtualEmergencyService) { }
  _notifications:Notifiactions[]=[];
  _notifications_backup:Notifiactions[]=[];
  _current_index:number = 5;
  _min:number = 0;
  ngOnInit() {
    this.setDataSource();
  }
  setDataSource(){
    this._min = this._min + 10;
    this._serve.global_service('0','/notification','emp_code='+localStorage.getItem('Employee_id')+'&limit='+this._min).pipe(map((x:any) => x.msg)).subscribe((res:any) => {
      // this._notifications.length = 0;
      this._notifications = res;
    console.log(res);
  })
  }
  clickToSeeNotifications(Id:any,_activity:any){
    if(localStorage.getItem('Employee_id') == '1'){}
    else{this._serve.clearNotifications(Id,_activity);}
  }

}
