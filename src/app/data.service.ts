import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';
import { Metrics } from '../app/models/metrics';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  metricsAvailable = new BehaviorSubject<boolean>(false);

  goalsSet = new BehaviorSubject<boolean>(false);
  userId;

  profileFilled = new BehaviorSubject<boolean>(false);
  fatChange = new BehaviorSubject<number>(0);
  balance = new BehaviorSubject<number>(0);
  goal;
  burnedCalories = new Subject<number>();
  gainedCalories = new Subject<number>();
  weight = new Subject<number>();

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    /*
    this.authService.authChange.subscribe((authStatus) => {
      this.authService.userId.subscribe((res) => (this.authChange = res));
    });
    */
    this.authService.user.subscribe((res) => (this.userId = res?.uid));
    //firebaseAuth.authState.subscribe((res) => (this.userId = res.uid));
  }
  setBurnedCalories(calories) {
    if(calories === ''){
      this.burnedCalories.next(0);
    }
    this.burnedCalories.next(calories);
  }
  setGainedCalories(calories) {
    this.gainedCalories.next(calories);
  }
  setMetricsAvailable(isAvailable: boolean) {
    this.metricsAvailable.next(isAvailable);
  }
  setGoalsAvailable(isAvailable: boolean) {
    this.goalsSet.next(isAvailable);
  }
  setMetrics(data) {
    this.afs
      .collection(`metrics/${this.userId}/metricsData`)
      .doc('id')
      .update(data);
  }
  getProfile() {
    console.log(this.userId);
    return this.afs
      .doc(`metrics/${this.userId}/metricsData/id`)
      .snapshotChanges();
  }
  isProfileFilled(val) {
    this.profileFilled.next(val);
  }
  getGoal() {
    return this.afs.doc(`goals/${this.userId}/goalsData/id`).snapshotChanges();
  }
  isGoalSet(val) {
    this.goalsSet.next(val);
  }
  setBurnedOrGainedCalories(data) {
    console.log(data);

    this.afs
      .collection(`records/${this.userId}/records`)

      .add(data);
  }
  getRecords() {
    return this.afs
      .collection(`records/${this.userId}/records`)
      .snapshotChanges();
  }
  getToday() {
    const year = new Date().getFullYear().toString();
    let month = (new Date().getMonth() + 1).toString();
    let date = new Date().getDate().toString();
    month = month.length > 1 ? month : '0' + month;
    date = date.length > 1 ? date : '0' + date;
    return year + month + date;
  }
  setFatChange(data) {
    this.fatChange.next(data);
  }
  setBalance(balance) {
    this.balance.next(balance);
  }
}
