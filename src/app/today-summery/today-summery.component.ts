import { Component, OnInit, Input } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { DataService } from '../data.service';

import * as moment from 'moment';

@Component({
  selector: 'app-today-summery',
  templateUrl: './today-summery.component.html',
  styleUrls: ['./today-summery.component.css'],
})
export class TodaySummeryComponent implements OnInit {
  gainedCalories = 0;
  burnedCalories = 0;

  positiveBalance = false;
  basalMetabolicRate = 0;
  metrics;
  goal;
  todayDate = moment().format('MMM Do YY');
  balance;
  bmrPopupText =
    'A person burns calories continually throughout the day in order to sustain basic life functions, such as breathing, circulation, and digestion. Basal metabolic rate is an estimate of the minimum number of calories a person needs each day to maintain these functions at a resting state.';

  constructor(private afs: AngularFirestore, private dataService: DataService) {
    const today = this.dataService.getToday();
    this.dataService.getProfile().subscribe((res) => {
      const metrics = res.payload.data();
      this.metrics = metrics;
      this.calculateBasalMetabolicRate(metrics);
    });
    this.dataService.getGoal().subscribe((res) => {
      this.goal = res.payload.data()['goal'];
    });
    this.dataService.getRecords().subscribe((records) => {
      let burnedCalories = 0;
      let gainedColories = 0;
      records.forEach((record) => {
        const recordData = record.payload.doc.data();
        if (recordData['date'] === today) {
          if (recordData['type'] === 'activity') {
            burnedCalories += recordData['calories'];
            console.log(recordData);
            console.log(burnedCalories);
            console.log(recordData);
          }
          if (recordData['type'] === 'foods') {
            gainedColories += recordData['calories'];
          }
        }
      });
      console.log(burnedCalories);
      console.log(gainedColories);
      this.dataService.setBurnedCalories(burnedCalories);
      this.dataService.setGainedCalories(gainedColories);
      this.dataService.setFatChange(
        this.convertCaloriesToFat(this.totalBalance())
      );
    });

    this.dataService.burnedCalories.subscribe(
      (res) => (this.burnedCalories = res)
    );
    this.dataService.gainedCalories.subscribe(
      (res) => (this.gainedCalories = res)
    );
    this.dataService.balance.subscribe((res) => (this.balance = res));
  }

  ngOnInit(): void {}
  calculateBasalMetabolicRate(metrics) {
    const age = new Date().getFullYear() - metrics.birthdate.year;
    console.log(age);
    let metabolicRate = 0;
    if (metrics?.gender === 'male') {
      metabolicRate =
        88.362 +
        13.397 * this.metrics.weight +
        4.799 * this.metrics.height -
        5.677 * age;
    } else if (metrics?.gender === 'female') {
      metabolicRate =
        447.593 + 9.247 * metrics.weight + 3.098 * metrics.height - 4.33 * age;
    }
    this.basalMetabolicRate = Math.round(metabolicRate);
  }
  convertCaloriesToFat(kcals) {
    return Math.round(kcals / 7.7);
  }
  convertFatToCalories(grams) {
    return Math.round(grams * 7.7);
  }
  lostOrGained() {
    const balance =
      this.gainedCalories -
      this.burnedCalories -
      this.lostByBasalMetabolicRateByThisHour();
    return balance >= 0 ? 'gained' : 'bunred';
  }
  totalBalance() {
    const balance =
      this.gainedCalories -
      this.burnedCalories -
      this.lostByBasalMetabolicRateByThisHour();
    this.positiveBalance = balance > 0 ? true : false;
    this.dataService.setBalance(balance);
    return balance < 0 ? -Math.round(balance) : Math.round(balance);
  }
  lostByBasalMetabolicRateByThisHour() {
    const nowFromMidnight = new Date().getHours();
    return Math.round((this.basalMetabolicRate / 24) * nowFromMidnight);
  }
  getTimeNow() {
    const Hour = new Date().getHours();
    const Minutes = new Date().getMinutes();
    const minutesFormatted = Minutes < 10 ? '0' + Minutes : Minutes;
    return Hour + ':' + minutesFormatted;
  }
}
