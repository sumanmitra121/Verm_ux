import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css',
   '../../../assets/css/adminLTE_Errors.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navigate(){
    if(localStorage.getItem('User_type')!='A'){
             this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/admin/dashboard']);

    }
  }
}
