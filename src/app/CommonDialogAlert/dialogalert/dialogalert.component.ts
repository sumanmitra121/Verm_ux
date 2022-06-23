import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(public dialogRef:MatDialogRef<DialogalertComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private toastr:ToastrManager,private emergencyservice:VirtualEmergencyService) { }

  ngOnInit(): void {}

  delete(){
    this.emergencyservice.global_service('0',this.data.api_name,'id='+this.data.id+'&user='+localStorage.getItem('Email')).subscribe(data=>{
      this.check_respond=data;
      if(this.check_respond.suc==1){
        this.dialogRef.close();
        this.toastr.successToastr(this.data.name +' deleted successfully','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
        }
        else{
          this.toastr.errorToastr('Something went wrong, failed to delete','',{position:'top-center',animate:'slideFromTop',toastTimeout:50000})
          }
    })
  }

}
