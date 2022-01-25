import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data = {}
  uname:any
  iat:any

  constructor(private cookieService: CookieService ,private http: HttpClient) { }
  cookieValue=""
  ngOnInit(): void {
    this.getcookiedata()
  }
  logout(){
    this.cookieService.deleteAll();
  }
  
  getcookiedata(){
    try {
      this.cookieValue = this.cookieService.get('jwt');
      this.data = {
        "jwt":this.cookieValue
      }
      console.log(this.data)
      this.http.get("http://localhost:4000/parsecookie/"+this.cookieValue)
      .subscribe((response:any) => {
        this.uname = (response.decoded.userId)
        this.iat = (response.decoded.iat)
        console.log(response)
      });
    } catch (error) {
      console.log(error)
    } 
  }
}
