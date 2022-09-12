import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';

@Component({
  selector: 'app-dialogalert',
  templateUrl: './dialogalert.component.html',
  styleUrls: ['./dialogalert.component.css']
})
export class DialogalertComponent implements OnInit {
  check_respond:any='';
  _u_type:any;
  @ViewChild('roles') roles!:ElementRef;
  constructor(public dialogRef:MatDialogRef<DialogalertComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private toastr:ToastrManager,
  private emergencyservice:VirtualEmergencyService,) {}

  ngOnInit(): void {this._u_type = localStorage.getItem('User_type');


}
ngAfterViewInit(){
  if(this.data.name == 'SP'){
    this.roles.nativeElement.insertAdjacentHTML('beforeend',this.data.roles);
   }
}

  delete(){
    this.dialogRef.close(1);
    if(this._u_type == 'A'){
    this.emergencyservice.global_service('0',this.data.api_name,'id='+this.data.id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
      this.check_respond=data;
      if(this.check_respond.suc==1){
        this.dialogRef.close(1);
        this.toastr.successToastr(this.data.name +' deleted successfully','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
        }
        else{
          this.dialogRef.close();
          this.toastr.errorToastr('Something went wrong, failed to delete','',{position:'bottom-right',animate:'slideFromRight',toastTimeout:7000})
          }
    })
   }
   else{
        this.dialogRef.close(1);
   }
  }

  ok(){
    this.dialogRef.close(1);
  }

}
