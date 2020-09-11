import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../data.service';

interface Metrics {
  birthdate: string;
  gender: string;
  height: number;
  weight: number;
}
@Component({
  selector: 'app-body-info',
  templateUrl: './body-info.component.html',
  styleUrls: ['./body-info.component.css'],
})
export class BodyInfoComponent implements OnInit {
  maxDate;
  metricsRef: AngularFirestoreCollection<Metrics>;

  userId;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.authService.user.subscribe((res) => (this.userId = res.uid));
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 12);
  }
  onSubmit(form: NgForm) {
    console.log(form.value.birthdate._i);

    this.metricsRef = this.afs.collection(`metrics/${this.userId}/metricsData`);
    form.value.birthdate = form.value.birthdate._i;
    this.metricsRef.doc('id').set(form.value);
    this.dataService.isProfileFilled(true);
  }
}
