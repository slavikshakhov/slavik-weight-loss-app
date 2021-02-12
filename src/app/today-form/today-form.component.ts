import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogComponent } from '../helpers/dialog/dialog.component';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { DataService } from '../data.service';

export interface DialogData {
  field: any;
  message: string;
}

@Component({
  selector: 'app-today-form',
  templateUrl: './today-form.component.html',
  styleUrls: ['./today-form.component.css'],
})
export class TodayFormComponent implements OnInit {
  userId;
  fatChange;
  balance;
  userSubscription: Subscription;

  data = {
    walking: {
      value: 0,
      message: 'How many steps have you done?',
      type: 'activity',
      calories: 0.04, // burned per step
    },
    jogging: {
      value: 0,
      message: 'How many minutes have you run?',
      type: 'activity',
      calories: 10.6, // burned per 1 minute
    },
    weightlifting: {
      value: 0,
      message: 'How long was your workout in minutes?',
      type: 'activity',
      calories: 3.7, // burned per 1 minute
    },
    swimming: {
      value: 0,
      message: 'How many meters have you swum?',
      type: 'activity',
      calories: 0.3, // burned per each meter swum
    },
    stairclimbing: {
      value: 0,
      message: 'How many stairs have you climbed?',
      type: 'activity',
      calories: 0.17, // burned per 1 step/stair
    },
    teamsprort: {
      // soccer, volleyball, ...
      value: 0,
      message: 'How long was the game in minutes?',
      type: 'activity',
      calories: 8.6, // burned per 1 minute
    },
    hiking: {
      value: 0,
      message: 'How many steps did you do hiking?',
      type: 'activity',
      calories: 0.06, // burned per step
    },

    breakfast: {
      value: 0,
      message: 'How many colories did your breakfast contain?',
      type: 'foods',
      calories: 0, // equal to value of calories given by user
    },
    lunch: {
      value: 0,
      message: 'How many colories did your lunch contain?',
      type: 'foods',
      calories: 0, // equal to value of calories given by user
    },
    dinner: {
      value: 0,
      message: 'How many colories did your dinner contain?',
      type: 'foods',
      calories: 0, // equal to value of calories given by user
    },
    snack: {
      value: 0,
      message: 'How many colories did your snack contain?',
      type: 'foods',
      calories: 0, // equal to value of calories given by user
    },
    alcohol: {
      value: 0,
      message: 'How many colories did your drink(s) contain?',
      type: 'foods',
      calories: 0, // equal to value of calories given by user
    },
  };
  field: number;
  burned = 0;

  constructor(
    public dialog: MatDialog,
    private afs: AngularFirestore,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.dataService.fatChange.subscribe((res) => (this.fatChange = res));
    this.dataService.balance.subscribe((res) => (this.balance = res));
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      (res) => (this.userId = res.uid)
    );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  openDialog(f, message): void {
    console.log('open dialog');

    Object.keys(this.data).map((k) => {
      if (k === f) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          position: { top: '5rem', right: '5rem' },
          data: { field: this.field, message },
        });

        dialogRef.afterClosed().subscribe((result) => {
          // tslint:disable-next-line: radix
          result = parseInt(result);
          console.log(result * this.data[k].calories);
          let caloriesGainedOrBurned =
            this.data[k].type === 'activity'
              ? result * this.data[k].calories
              : result;
          caloriesGainedOrBurned = Number.isNaN(caloriesGainedOrBurned)
            ? 0
            : caloriesGainedOrBurned;
          console.log(caloriesGainedOrBurned);
          this.data[k] = {
            ...this.data[k],
            calories: caloriesGainedOrBurned,
          };

          // tslint:disable-next-line: radix

          this.dataService.setBurnedOrGainedCalories({
            activity: k,
            type: this.data[k].type,
            calories: this.data[k].calories,
            date: this.dataService.getToday(),
          });
        });
      } else {
        return null;
      }
    });
  }
}
