import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAQhCEbPG7xkh8kLTTd_hZp-UZI-Ef5tE0",
      authDomain: "ng-recipe-book-549fe.firebaseapp.com"
    });
  }
}
