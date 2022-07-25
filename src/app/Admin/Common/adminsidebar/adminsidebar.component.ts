import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'angular2-multiselect-dropdown';
declare var $:any;
@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  signout(){
    localStorage.clear();
    this.router.navigate(['/admin'])
  }

}
