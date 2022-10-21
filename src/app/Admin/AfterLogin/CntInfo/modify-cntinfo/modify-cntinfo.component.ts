import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';

@Component({
  selector: 'app-modify-cntinfo',
  templateUrl: './modify-cntinfo.component.html',
  styleUrls: ['./modify-cntinfo.component.css'],
})
export class ModifyCntinfoComponent implements OnInit {
  id = Number(atob(this.aRT.snapshot.params.id));
  setCat:any=[];
  c_info!:FormGroup;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private aRT: ActivatedRoute,
    private api_call: VirtualEmergencyService) {
    this.getCntCategory();
    this.addForm();
  }
  ngOnInit(): void {
    if(Number(atob(this.aRT.snapshot.params.id)) > 0){
      this.api_call.global_service(0,'/contact_info','id='+Number(atob(this.aRT.snapshot.params.id))).pipe(map((x:any) => x.msg)).subscribe(res =>{
        this.setForm(res);
      })
    }
    else{
      this.addnew_subContact();
    }

  }
  addForm(){
    this.c_info = new FormGroup({
       catg_id:new FormControl('',[Validators.required]),
       dt:new FormArray([]),
       user:new FormControl(localStorage.getItem('Email'))
    })
  }
  getCntCategory(){
    this.api_call.global_service(0,'/contact_catg',null).pipe(map((x:any) => x.msg)).subscribe(res =>{
      this.setCat = res;
    })
  }
  get subContact() : FormArray {
    return this.c_info.get("dt") as FormArray;
  }
  new_subContact(): FormGroup{
    return new FormGroup({
      id:new FormControl(0),
      con_desc: new FormControl('',[Validators.required]),
      con_name: new FormControl('',[Validators.required]),
      con_addr: new FormControl('',[Validators.required]),
      con_email: new FormControl('',[Validators.required]),
      con_no: new FormControl('',[Validators.required])
    });
   }
   addnew_subContact() {
    if(this.subContact.controls.length > 1){
      this.subContact.controls.reverse();
    }
    this.subContact.push(this.new_subContact());
    this.subContact.controls.reverse();
  }
  set_subContact(id:any,con_desc:any,con_name:any,con_addr:any,con_email:any,con_no:any): FormGroup{
    return new FormGroup({
      id:new FormControl(id),
      con_desc: new FormControl(con_desc,[Validators.required]),
      con_name: new FormControl(con_name,[Validators.required]),
      con_addr: new FormControl(con_addr,[Validators.required]),
      con_email: new FormControl(con_email,[Validators.required]),
      con_no: new FormControl(con_no,[Validators.required])
    });
   }
   removeSubContact(index: any,_id:any){
    const disalogConfig=new MatDialogConfig();
      disalogConfig.disableClose=false;
      disalogConfig.autoFocus=true;
      disalogConfig.width='35%';
      disalogConfig.data={id:_id,api_name:'/contact_info_del',name:'contact information'}
      const dialogref=this.dialog.open(DialogalertComponent,disalogConfig);
      dialogref.afterClosed().subscribe(dt=>{
       if(dt){
        this.subContact.removeAt(index);
       }
      })
   }
   submitContactInformation(){
    this.api_call.global_service(1,'/contact_info',this.c_info.value).subscribe((res:any) =>{
       this.api_call.showToast(res.msg,res.suc > 0 ? 'S' : 'E');
       this.router.navigate(['/admin/cntinfo']);
    })
   }
   setForm(res:any){
    this.c_info.patchValue({catg_id:res[0].catg_id})
    res.forEach((element:any) => {
       this.subContact.push(this.set_subContact(element.id,element.con_desc,element.con_name,element.con_addr,element.con_email,element.con_no))
    });
   }
}
