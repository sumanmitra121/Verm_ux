import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild,OnDestroy, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { VirtualEmergencyService } from 'src/app/Services/virtual-emergency.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrManager } from 'ng6-toastr-notifications';
import { global_url_test } from 'src/app/url';
///END//////////////////////////
declare var $: any;
@Component({
  selector: 'app-live-log',
  templateUrl: './live-log.component.html',
  styleUrls: ['./live-log.component.css']
})
export class LiveLogComponent implements OnInit,OnDestroy  {
  //For Emoji
  public isEmojiPickerVisible!: boolean;
  count:any=0;
  //For file upload
  uploaded_file: any = '';
  @ViewChild('logForm') logform!: NgForm;
  headername: any = 'Live Log';
  icon: any = 'fa-television';
  socket: any;
  newMessage: any;
  inp: any;
  url=global_url_test.URL;
  user: any = localStorage.getItem('Emp_name');
  constructor(private sanitize: DomSanitizer,private emergencyservice: VirtualEmergencyService, private datePipe: DatePipe,private sanitizer: DomSanitizer,private spinner:NgxSpinnerService,private toaster:ToastrManager) {
  }
  recieved_msg: any = [];
  public roomId: any;
  public messageText: any;
  messageList: any = [];
  public messageArray: { user: any, message: any }[] = [];
  storageArray: any = [];
  element: any;
  public showScreen = false;
  public phone: any;
  public currentUser: any;
  public selectedUser: any;
  li_select: any;
  Emp_Check: any = [];
  emp_list: any = [];
  old_msg: any = [];
  Image:any;
  min:any=0;
  file_url:any;
  file_type:any='';
  ngOnInit(): void {
      localStorage.setItem('router','/livelog');
      localStorage.removeItem('message_come');
    //For getting active Employee
    this.spinner.show();
    this.emergencyservice.get_logged_employee('active_user').subscribe((data: any) => {
      this.Emp_Check = data;
      this.Emp_Check = this.Emp_Check.users;
      this.emp_list.length = 0;
      if(this.Emp_Check.length!=0){
        for (let i = 0; i < this.Emp_Check.length; i++) {
          if (this.Emp_Check[i].employee_id != localStorage.getItem('Employee_id') && this.Emp_Check[i].employee_id != '1') {
            this.emp_list.push(this.Emp_Check[i]);
          }
        }
        this.spinner.hide();
      }
      else{

        this.spinner.hide();
      }


    })
    //For getting old message
    this.emergencyservice.global_service('0', '/oldMessage', 'min='+this.min+'&max=5'+'&id='+localStorage.getItem('Inc_id')).subscribe(data => {
     console.log( data);
      this.storageArray.length = 0;
      this.storageArray = data;
      this.storageArray = this.storageArray.msg;
      for (let i = (this.storageArray.length-1); i >= 0; i--) {
        if (this.storageArray[i].employee_id != localStorage.getItem('Employee_id')) {
          this.element = document.createElement('li');
          if(this.storageArray[i].file_flag==0){
            this.element.innerHTML = "<b>" + this.storageArray[i].emp_name + "</b>" + "<br>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
          }
          else{
            if(this.storageArray[i].file.split(".")[1]=='pdf'){
            this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" + this.storageArray[i].chat_dt;
            }
            else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
            this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" + this.storageArray[i].chat_dt;

            }
            else{
            this.element.innerHTML ="<b>" + this.storageArray[i].emp_name + "</b>" + "<br><br>"+"<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
            }
          }
          this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;';
          this.element.style.background = 'rgb(46 232 220 / 5%)';
          this.element.style.padding = '15px 30px';
          this.element.style.margin = '10px';
          this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
          this.element.style.width='50%';
          this.element.style.float='left';
          this.messageText = document.getElementById('message-list');
          this.messageText.appendChild(this.element);
        }
        else {
           this.element = document.createElement('li');
           if(this.storageArray[i].file_flag==0){
            this.element.innerHTML =  "<b>Me </b><br>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
          }
          else{
            if(this.storageArray[i].file.split(".")[1]=='pdf'){
            this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
            }
            else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
              this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;

            }
            else{
            this.element.innerHTML ="<b>Me </b><br><br>" +"<a  target='_blank' href="+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
            }
          }
          this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;';

          this.element.style.background = 'white';
          this.element.style.padding = '15px 30px';
          this.element.style.margin = '10px';
          this.element.style.border = '1px solid rgb(128 128 128 / 42%)';

          // this.element.style.textAlign = 'right';
          this.element.style.width='50%';

          this.element.style.float='right';
          this.messageText = document.getElementById('message-list');
          this.messageText.appendChild(this.element);
        }
      }
      this.li_select = document.querySelector(".chat-messages-show-list li:last-child")
      this.li_select.scrollIntoView({ behavior: 'smooth' });
    })

  //Load data on scrolling in chat
    $('.chat-messages-show-container').scroll(()=>{
      if($('.chat-messages-show-container').scrollTop() == 0){
        this.min += 5;
        this.emergencyservice.global_service('0', '/oldMessage', 'min='+this.min+'&max=5'+'&id='+localStorage.getItem('Inc_id')).subscribe(data => {
          this.storageArray.length = 0;
          this.storageArray = data;
          this.storageArray = this.storageArray.msg;
          if(this.storageArray.length!=0){
          for (let i = 0; i <this.storageArray.length; i++) {
            if (this.storageArray[i].employee_id != localStorage.getItem('Employee_id')) {
              this.element = document.createElement('li');
              if(this.storageArray[i].file_flag==0){
                this.element.innerHTML = "<b>" + this.storageArray[i].emp_name + "</b>" + "<br>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
              }
              else{
                if(this.storageArray[i].file.split(".")[1]=='pdf'){
                this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" + this.storageArray[i].chat_dt;
                }
                else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
                  this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"' class='adjustContent float-right' ><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>" + this.storageArray[i].emp_name + "</b>" + "     " + this.storageArray[i].chat + "<br>" + "" + this.storageArray[i].chat_dt;
                }
                else{
                this.element.innerHTML ="<b>" + this.storageArray[i].emp_name + "</b>" + "<br><br>"+"<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
                }
              }
              this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;';
              this.element.style.background = 'rgb(46 232 220 / 5%)';
              this.element.style.padding = '15px 30px';
              this.element.style.margin = '10px';
              this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
              this.element.style.width='50%';
              this.element.style.float='left';

              this.messageText = document.getElementById('message-list');
              this.messageText.insertBefore(this.element, this.messageText.firstElementChild);
              // this.messageText.appendChild(this.element);


            }
            else {
               this.element = document.createElement('li');
               if(this.storageArray[i].file_flag==0){
                this.element.innerHTML =  "<b>Me </b><br>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
              }
              else{
                if(this.storageArray[i].file.split(".")[1]=='pdf'){
                  this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
                }
                else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
                  this.element.innerHTML ="<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+ "' class='adjustContent float-right'><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a>"+"<b>Me      </b>" + this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
                }
                else{
                this.element.innerHTML ="<b>Me </b><br><br>" +"<a  target='_blank' href="+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"><img class='img-fluid' height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a>" +"<br><br>"+ this.storageArray[i].chat + "<br>" + "<br>" + this.storageArray[i].chat_dt;
                }
              }
              this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;';
              this.element.style.background = 'white';
              this.element.style.padding = '15px 30px';
              this.element.style.margin = '10px';
              this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
              // this.element.style.textAlign = 'right';
              this.element.style.width='50%';
              this.element.style.float='right';
              this.messageText = document.getElementById('message-list');
              this.messageText.insertBefore(this.element, this.messageText.firstElementChild);
              // this.messageText.appendChild(this.element);
            }
          }
          $('.chat-messages-show-container').animate(
            { scrollTop: "520" }, 'slow');
         }
          else{

          }

        })
      }
});

    //For getting instant messages sent by other users without refresh the page
    this.emergencyservice.listen('message').subscribe(data => {
      console.log("NEW MESSAGE:" +data);
      this.phone = data;
      this.storageArray.length = 0;
      this.messageList.push({file_flag:this.phone.file_flag,file:this.phone.file_name!='' ? this.phone.file_name:'', user: this.phone.user, msg: this.phone.message, dateTime: this.phone.date_time, emp_id: this.phone.emp_id });

      for (let i = 0; i < this.messageList.length; i++) {
        this.storageArray[0] = this.messageList[i];
      }

      if (this.storageArray) {

        for (let i = 0; i < this.storageArray.length; i++) {
          if (this.storageArray[i].emp_id != localStorage.getItem('Employee_id')) {
             this.element = document.createElement('li');
             if(this.storageArray[i].file_flag=='0'){
              this.element.innerHTML = "<b>" + this.storageArray[i].user + "</b>" + "<br>" + this.storageArray[i].msg + "<br>" + "<br>" + this.storageArray[i].dateTime;
            }
            else{
              if(this.storageArray[i].file.split(".")[1]=='pdf'){
              this.element.innerHTML ="<a class='adjustContent float-right'  target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"'><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a><b>" + this.storageArray[i].user + "</b>" + " : " + this.storageArray[i].msg + "<br>" + "" + this.storageArray[i].dateTime;
              }
              else if(this.storageArray[i].file.split(".")[1]=='doc' || this.storageArray[i].file.split(".")[1]=='docx'){
                this.element.innerHTML ="<a class='adjustContent float-right'  target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file +"'><i class='fa fa-file-word-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a><b>" + this.storageArray[i].user + "</b>" + " : " + this.storageArray[i].msg + "<br>" + "" + this.storageArray[i].dateTime;

              }
              else{
              this.element.innerHTML ="<b>" + this.storageArray[i].user + "</b>" + "<br>" +"<a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'><img height='200px' width='100%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a><br><br>" + this.storageArray[i].msg + "<br>" + "<br>" + this.storageArray[i].dateTime;
              }
            }

            // this.element.innerHTML = "<b>" + this.storageArray[i].user + "</b>" + " : " + this.storageArray[i].msg + "<br>" + "" + this.storageArray[i].dateTime;
            this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;';
            this.element.style.background = 'rgb(46 232 220 / 5%)';
            this.element.style.padding = '15px 30px';
            this.element.style.margin = '10px';
            this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
            this.element.style.width='50%';
            this.element.style.float='left';
            this.messageText = document.getElementById('message-list');
            this.messageText.appendChild(this.element);
          }
          else {
            this.element = document.createElement('li');
            if (this.storageArray[i].emp_id != localStorage.getItem('Employee_id')) {
              this.element = document.createElement('li');
              if(this.storageArray[i].file_flag=='0'){
               this.element.innerHTML = "<b>Me </b><br>" + this.storageArray[i].msg + "<br>" + "<br>" + this.storageArray[i].dateTime;
             }
             else{
               if(this.storageArray[i].file.split(".")[1]=='pdf'){
               this.element.innerHTML ="<a class='adjustContent float-right'  target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'><i class='fa fa-file-pdf-o p-1' style='font-size:25px'></i>"+this.storageArray[i].file+"</a><b>Me      </b>" + this.storageArray[i].msg + "<br>" + "" + this.storageArray[i].dateTime;
               }
               else{
               this.element.innerHTML ="<b>Me</b>"+"<br><br><a target='_blank' href='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'><img class='img-fluid' height='200px' width='q00%' src='"+this.emergencyservice.url+"/uploads/"+this.storageArray[i].file+"'/></a><br><br>" + this.storageArray[i].msg + "<br>" + "<br>" + this.storageArray[i].dateTime;
               }
             }
            //  this.element.innerHTML = "<b>Me: </b>" + this.storageArray[i].msg + "<br>" + "" + this.storageArray[i].dateTime;
            this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;';

            this.element.style.background = '#d1e3ff6b';
            // this.element.style.background = 'white';
            this.element.style.padding = '15px 30px';
            this.element.style.margin = '10px';
            this.element.style.border = '1px solid rgb(128 128 128 / 42%)';

          // this.element.style.textAlign = 'right';
          this.element.style.width='50%';

          this.element.style.float='right';
            this.messageText = document.getElementById('message-list');
            this.messageText.appendChild(this.element);
          }

             }

        this.li_select = document.querySelector(".chat-messages-show-list li:last-child")

        this.li_select.scrollIntoView({ behavior: 'smooth' });

      }
      }
    })
  }

  submit(logForm: any) {
    if(this.uploaded_file!='' || this.logform.form.value.txt!=''){
    this.isEmojiPickerVisible=false;
    var date = new Date();
    let latest_date = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
    this.storageArray.length = 0;
    var dt = {
      message: this.logform.form.value.txt,
      user: this.user,
      inc_id: localStorage.getItem('Inc_id'),
      emp_id: localStorage.getItem('Employee_id'),
      file: this.uploaded_file,
      file_name: this.uploaded_file.name
    };
    this.emergencyservice.emit('message', dt);//emit chat after submit
    this.element = document.createElement('li');
    if( this.uploaded_file!=''){
      if(this.uploaded_file.type.split("/")[1]=='pdf'){
        this.Image=URL.createObjectURL(this.uploaded_file);
        this.element.innerHTML ="<a class='adjustContent float-right'  target='_blank' href='"+this.Image+"'><i class='fa fa-file-pdf-o p-1' style='font-size:25px' aria-hidden='true'></i>"+this.uploaded_file.name+"</a><b>Me</b>"+"     " + this.logform.form.value.txt + "<br>" + latest_date ;
      }
      else if(this.uploaded_file.name.split(".")[1]=='doc' || this.uploaded_file.name.split(".")[1]=='docx'){
        this.element.innerHTML ="<a class='adjustContent float-right'  target='_blank' href='"+this.Image+"'><i class='fa fa-file-word-o p-1' style='font-size:25px' aria-hidden='true'></i>"+this.uploaded_file.name+"</a><b>Me</b>"+"     " + this.logform.form.value.txt + "<br>" + latest_date ;
      }
      else{
       let message=this.logform.form.value.txt;
       let reader=new FileReader();
        reader.onload=(event:any)=>{
        this.element.innerHTML ="<b>Me</b>"+"<br><br><a target='_blank' href='"+event.target.result +"'><img src='"+event.target.result+"' class='img-fluid' height='200px' width='100%'/></a><br><br>" + message + "<br><br>" + latest_date ;
        }
        reader.readAsDataURL(this.uploaded_file);
      }
    }
    else{
      this.element.innerHTML ="<b>Me </b><br>" + this.logform.form.value.txt + "<br><br>" + latest_date ;
    }
    this.element.style='border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-left-radius: 10px;';
    this.element.style.background = 'white';
    this.element.style.padding = '15px 30px';
    this.element.style.margin = '10px';
    this.element.style.border = '1px solid rgb(128 128 128 / 42%)';
    this.element.style.width='50%';
    this.element.style.float='right';
    this.messageText = document.getElementById('message-list');
    this.messageText.appendChild(this.element);
    this.inp = document.getElementById('inp');
    this.inp.value = '';
    this.logform.reset();
    this.logform.form.value.txt = '';
    this.li_select = document.querySelector(".chat-messages-show-list li:last-child");
    this.li_select.scrollIntoView({ behavior: 'smooth' });
    this.uploaded_file='';
  }
  else{

  }

  }
  scrolled(event: any) {}
  //For Assign the emojies in the input field
  public addEmoji(event: any) {
    $('#inp').val(this.logform.form.value.txt + `${event.emoji.native}`);//For showing emoji in particular input field
    this.logform.form.value.txt = this.logform.form.value.txt + `${event.emoji.native}`;
  }
  // For Choose image
  upload_file(event: any) {
    this.uploaded_file='';
    this.file_url='';
    this.uploaded_file = event.target.files!=='' ? event.target.files[0] : '';
    this.file_type=this.uploaded_file.name.split(".")[1];
    if(this.uploaded_file.name.split(".")[1]=='jpg' || this.uploaded_file.name.split(".")[1]=='png' || this.uploaded_file.name.split(".")[1]=='jpeg'){
      // var reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);
      // reader.onload = (_event) => {
      //   this.file_url = reader.result;
      // }
      // const modal=document.getElementById("show_modal");
      // modal?.click();
    }
    else
    {
      // var blob = new Blob([ this.uploaded_file], { type: this.uploaded_file.type.toString() });
      // this.file_url=URL.createObjectURL(blob);
      // window.open(this.file_url,'_blank');
    }
}
  active_input_file(){$('#File_Upload').val(null);$('#File_Upload').click();}//For Activate input type file

  //Destroy the component
  ngOnDestroy(): void {
    localStorage.setItem('router','');
  }

  emptyFile(){
    this.uploaded_file='';
    this.file_url='';
    this.file_type='';
  }
  previewFile(type:any){
    if(type=='pdf' || type=='doc' || type=='docx'){
    var blob = new Blob([ this.uploaded_file], { type: this.uploaded_file.type.toString() });
      this.file_url=URL.createObjectURL(blob);
      window.open(this.file_url,'_blank');
    }
    else if(type=='jpeg' || type=='jpg' || type=='png'){
      var reader = new FileReader();
      reader.readAsDataURL(this.uploaded_file);
      reader.onload = (_event) => {
        this.file_url = reader.result;}
      const modal=document.getElementById("show_modal");
      modal?.click();
    }}

}



