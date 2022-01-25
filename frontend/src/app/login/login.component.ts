import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('') 
    })
  constructor(private http: HttpClient,private cookieService: CookieService) { }
test=""
islogin=false;
wrongcred=false;
  ngOnInit(): void {
  }
  submit(){
    var formdata={
      username:this.form.value.username,
      password:this.form.value.password,
    }
    this.http.post("http://localhost:4000/api/auth/login",formdata)
      .subscribe((response:any) => {
        try {
          console.log(response)
          const tkn = response.jwt
          this.cookieService.set("jwt",tkn);
          if(response.message=="user not registered" || response.message=="username or passwords do not match"){
            this.islogin=false;
            this.wrongcred=true;
          }
          else{
            this.islogin=true;
            this.wrongcred=false;
          }
        } catch (error) {
          this.islogin=false;
          this.wrongcred=true;
        }
      });
  }

}
