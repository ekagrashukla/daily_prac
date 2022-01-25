import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }
  form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('') 
    })
  ngOnInit(): void {
  }
  
  submit(){
    var formdata={
      username:this.form.value.username,
      password:this.form.value.password,
      firstname:this.form.value.firstname,
      lastname:this.form.value.lastname
    }
    this.http.post("http://localhost:4000/api/auth/signup",formdata)
      .subscribe((response) => {
        console.log(response)
      });
    console.log(formdata)
  }

}
