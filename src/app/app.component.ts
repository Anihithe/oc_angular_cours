import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyBsIiyhHUN3ndthxkvM6DgotJ1FBm3kNf4',
      authDomain: 'library-c3e6b.firebaseapp.com',
      databaseURL: 'https://library-c3e6b.firebaseio.com',
      projectId: 'library-c3e6b',
      storageBucket: 'library-c3e6b.appspot.com',
      messagingSenderId: '922361687752'
    };
    firebase.initializeApp(config);

  }

  ngOnInit() {

  }
}
