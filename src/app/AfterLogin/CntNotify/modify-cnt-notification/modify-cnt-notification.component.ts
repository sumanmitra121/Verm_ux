import { global_url_test } from './../../../url';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, ControlContainer } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogalertComponent } from 'src/app/CommonDialogAlert/dialogalert/dialogalert.component';


@Component({
  selector: 'app-modify-cnt-notification',
  templateUrl: './modify-cnt-notification.component.html',
  styleUrls: [
    './modify-cnt-notification.component.css',
    '../../../../assets/css/notification_forms.css'
  ],
})
export class ModifyCntNotificationComponent implements OnInit {
  @ViewChild('bu') BU!: ElementRef;
  @ViewChild('tel') TEL!: ElementRef;
  @ViewChild('fax') FAX!: ElementRef;
  CntNotify!: FormGroup;
  constructor(
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private api_call: VirtualEmergencyService,
  ) {
    this.setContactNotification();
  }
  ngOnInit(): void {}
  setContactNotification() {
    this.CntNotify = new FormGroup({
      inc_id: new FormControl(localStorage.getItem('Inc_No')),
      user:new FormControl(localStorage.getItem('Email')),
      from: new FormControl(''),
      bu: new FormControl(''),
      opu: new FormControl(''),
      tel: new FormControl(''),
      fax: new FormControl(''),
      seq_no: new FormControl(''),
      brief_desc: new FormControl(''),
      action_taken: new FormControl(''),
      add_info: new FormControl(''),
      datetime:new FormControl(''),
      opu_type: new FormGroup({
        non_emer: new FormControl(false),
        tire1: new FormControl(false),
        tire2: new FormControl(false),
        tire3: new FormControl(false),
      }),
      comcen: new FormGroup({
        with_impact: new FormControl(false),
        no_impact: new FormControl(false),
        hi_po: new FormControl(false),
      }),
      type_of_noti: new FormGroup({
        initial: new FormControl(false),
        update: new FormControl(false),
        nothing_to_report: new FormControl(false),
        stand_down: new FormControl(false),
        temp_case: new FormControl(false),
        dt: new FormControl(''),
        time: new FormControl(''),
      }),
      location: new FormGroup({
        onshore: new FormControl(false),
        onshore_text: new FormControl(''),
        offshore: new FormControl(false),
        offshore_text: new FormControl(''),
        malaysia: new FormControl(false),
        international: new FormControl(false),
        dt: new FormControl(''),
        time: new FormControl(''),
      }),
      dept_res: new FormControl(''),
      hse: new FormGroup({
        fire: new FormControl(false),
        exp: new FormControl(false),
        haz: new FormControl(false),
        hi_po: new FormControl(false),
        chem: new FormControl(false),
        liquid: new FormControl(false),
        gas: new FormControl(false),
        spill: new FormControl(false),
        other: new FormControl(false),
        other_text: new FormControl(''),
        rel_vol: new FormControl(''),
        recov_vol: new FormControl(''),
      }),
      security: new FormGroup({
        comm: new FormControl(false),
        encro: new FormControl(false),
        bomb: new FormControl(false),
        piracy: new FormControl(false),
        rob: new FormControl(false),
        demo: new FormControl(false),
        host: new FormControl(false),
        kidn: new FormControl(false),
        hija: new FormControl(false),
        sea_rob: new FormControl(false),
        murder: new FormControl(false),
        terror: new FormControl(false),
        other: new FormControl(false),
        other_text: new FormControl(''),
      }),
      transport: new FormGroup({
        land: new FormControl(false),
        water: new FormControl(false),
        air: new FormControl(false),
        other: new FormControl(false),
        other_text: new FormControl(''),
      }),
      natu_dis: new FormGroup({
        flood: new FormControl(false),
        eartqk: new FormControl(false),
        tus: new FormControl(false),
        other: new FormControl(false),
        other_text: new FormControl(''),
      }),
      impact: new FormGroup({
        peop: new FormControl(false),
        env: new FormControl(false),
        asset: new FormControl(false),
        repu: new FormControl(false),
      }),
      injury_type: new FormGroup({
        petro: new FormControl(false),
        petro_no: new FormControl(''),
        contr: new FormControl(false),
        contr_no: new FormControl(''),
        trd: new FormControl(false),
        trd_no: new FormControl(''),
      }),
      ill_type: new FormGroup({
        petro: new FormControl(false),
        petro_no: new FormControl(''),
        contr: new FormControl(false),
        contr_no: new FormControl(''),
        trd: new FormControl(false),
        trd_no: new FormControl(''),
      }),
      fata_type: new FormGroup({
        petro: new FormControl(false),
        petro_no: new FormControl(''),
        contr: new FormControl(false),
        contr_no: new FormControl(''),
        trd: new FormControl(false),
        trd_no: new FormControl(''),
      }),
      miss_type: new FormGroup({
        petro: new FormControl(false),
        petro_no: new FormControl(''),
        contr: new FormControl(false),
        contr_no: new FormControl(''),
        trd: new FormControl(false),
        trd_no: new FormControl(''),
      }),
      poten_escal: new FormGroup({
        under_control: new FormControl(false),
        may_req: new FormControl(false),
        auth_may_take_over: new FormControl(false),
        may_trigger: new FormControl(false),
      }),
      auth_informed: new FormGroup({
        date: new FormControl(''),
        police: new FormControl(false),
        fire_dept: new FormControl(false),
        medical: new FormControl(false),
        civil_def: new FormControl(false),
        hse_regu: new FormControl(false),
        hse_regu_dept: new FormControl(''),
        others: new FormControl(false),
        others_txt: new FormControl(''),
      }),

      stand_down: new FormGroup({
        dt: new FormControl(''),
        time: new FormControl(''),
      }),
      prepared: new FormGroup({
        name: new FormControl(''),
        desig: new FormControl(''),
        contact: new FormControl(''),
        dt: new FormControl(''),
        signature: new FormControl(''),
        signature_source:new FormControl(''),
        info: new FormControl(''),
      }),
      approved: new FormGroup({
        name: new FormControl(''),
        desig: new FormControl(''),
        contact: new FormControl(''),
        dt: new FormControl(''),
        signature: new FormControl(''),
        signature_source:new FormControl(''),
        info: new FormControl(''),
      }),
    });
  }
  saveForm() {
    if(localStorage.getItem('inc_no') != ''){
      this.CntNotify.patchValue({
        date:this.datePipe.transform(new Date(), 'YYYY-MM-ddTHH:mm:ss')
       });
      this.openDialog(this.CntNotify.value);
    }
    else{
      this.api_call.showToast('Sorry There are no active incident available','E');
    }
    // this.CntNotify.patchValue({
    //   datetime:this.datePipe.transform(new Date(), 'YYYY-MM-ddTHH:mm:ss')
    //  });
    // this.openDialog(this.CntNotify.value);

  }
  setFormControl(type: any, val: any) {
    switch (type) {
      case 'bu':
        this.CntNotify.patchValue({ bu: val.value });
        break;
      case 'tel':
        this.CntNotify.patchValue({ tel: val.value });
        break;
      case 'fax':
        this.CntNotify.patchValue({ fax: val.value });
        break;
      default:break;
    }
  }
  ngAfterViewInit() {
    this.setBU();
    this.setTEL();
    this.setFAX();
  }
  setBU() {
    this.CntNotify.get('bu')?.valueChanges.subscribe((res) => {
      this.BU.nativeElement.value = res;
    });
  }
  setTEL() {
    this.CntNotify.get('tel')?.valueChanges.subscribe((res) => {
      this.TEL.nativeElement.value = res;
    });
  }
  setFAX() {
    this.CntNotify.get('fax')?.valueChanges.subscribe((res) => {
      this.FAX.nativeElement.value = res;
    });
  }
 async submitSignature(event: any,type:any){
  console.log(event.target.files)
     if(event.target.files.length > 0){
      if(await this.validateFileTYpe(event.target.files[0].name)){
        this.spinner.show();
        // var api_name = type == 'P' ? '/preparedImg' : '/approvedImg';
        const fb = new FormData();
        fb.append('file',event.target.files[0]);
        this.api_call.global_service(1,'/upload_img',fb).subscribe((res: any) =>{
             if(res.suc > 0){
             this.setImage(type,global_url_test.URL + res.path);
             }
             else{
                   this.api_call.showToast('Problem in loading image','E');
             }
         this.spinner.hide();
        })
      }
      else{
        this.api_call.showToast('File is not Supported','E');
        this.setImage(type,'');
        this.resetImageSource();
      }
     }
  }
  deleteImage(type: any){
   this.setImage(type,'');
   this.resetImageSource();
  }
  setImage(type:any,img_src:any){
    switch(type){
      case 'P' :
                this.CntNotify.patchValue({
                  prepared: {
                  signature: img_src
                  }
                });
                break;
      case 'A' :
                this.CntNotify.patchValue({
                  approved: {
                  signature: img_src
                  }
                });
                break;
       default: break;
     }
  }
  async validateFileTYpe(fileName:any){
    var validExt = [ 'pdf', 'jpg', 'png' ];
    var ext = fileName.split('.').pop();
    if (validExt.indexOf(ext.toLowerCase()) == -1) {
      return false;
    }
    return true;
  }
  openDialog(data:any) {
      const disalogConfig = new MatDialogConfig();
      disalogConfig.disableClose = false;
      disalogConfig.autoFocus = true;
    disalogConfig.width = '35%';
    disalogConfig.data = { id: 0, api_name: '', name: 'C_notify' }
      const dialogref = this.dialog.open(DialogalertComponent, disalogConfig);
      dialogref.afterClosed().subscribe(dt => {
        if (dt) {
          this.callSubmit_api(data);}
        else { }
      })
  }

  callSubmit_api(dt: any) {
    this.spinner.show();
    this.api_call.global_service(1, '/comcen_notification',this.CntNotify.value).subscribe((res:any) =>{
        this.api_call.showToast(res.suc > 0 ? 'Save successfull . Please check the submitted form inside the ER-Repository Module' : 'Something went wrong! please try again later' , res.suc > 0 ? 'S' : 'E');
         if(res.suc > 0){
          this.spinner.hide();
          this.CntNotify.reset();
          this.CntNotify.patchValue({
            approved:{
              signature:''
            },
            prepared:{
              signature:''
            }
          })
          this.resetImageSource();
         }
         else{
          this.spinner.hide();
         }
     },
     err => {
      this.spinner.hide();
     })
  }

  resetImageSource(){
    this.CntNotify.patchValue({
      prepared: {
      signature_souce: '',
      },
      approved:{
      signature_souce: '',
      }
    });
  }

}
