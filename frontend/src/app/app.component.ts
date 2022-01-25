import { Component } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  purchaseData:any = [];
  constructor() { }
}
