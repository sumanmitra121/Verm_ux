import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  IsLoggedIn(){
    return !!localStorage.getItem('_u_login');
  }
  IsAdminLoggedIn(){
    return !!localStorage.getItem('_a_login');
  }
}
