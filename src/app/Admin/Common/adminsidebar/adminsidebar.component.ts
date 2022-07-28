
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
