import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  goals = [
    { field: 0.5, value: 0.5 },
    { field: 1, value: 1 },
    { field: 1.5, value: 1.5 },
    { field: 2, value: 2 },
    { field: 2.5, value: 2.5 },
  ];
  userId;

  constructor(
    private dataService: DataService,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user.subscribe((res) => (this.userId = res.uid));
  }

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.afs
      .collection(`goals/${this.userId}/goalsData`)
      .doc('id')
      .set(form.value);

    this.dataService.isGoalSet(true);
    this.router.navigate(['']);
  }
  closeBlock() {
    this.router.navigate(['']);
  }
}
