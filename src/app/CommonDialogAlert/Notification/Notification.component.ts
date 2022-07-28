import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notifiactions } from 'src/app/Model/Notifiactions';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { map, take } from 'rxjs/operators';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-Notification',
  templateUrl: './Notification.component.html',
  styleUrls: ['./Notification.component.css']
})
export class NotificationComponent implements OnInit {
  displayedColumns: string[] = ['Notifications'];
  dataSource = new MatTableDataSource<Notifiactions[]>();
  constructor(private route:ActivatedRoute,private _serve:VirtualEmergencyService) { }
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
  })
  }

  // clickToSeeNotifications(Id:any){
  //   // console.log(Id);
  //   this._serve.global_service('1','/notification',{id:Id}).subscribe(res =>{
  //     console.log(res);

  //   })
  // }
}
