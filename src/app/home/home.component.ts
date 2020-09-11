import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // get from db
  goalsSet;
  profileFilled;
  userId;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((res) => {
      console.log(res.uid);
      if (res.uid) {
        this.dataService.getProfile().subscribe((data) => {
          const profile = data.payload.data();
          console.log(profile);
          this.dataService.isProfileFilled(Object.keys(profile).length !== 0);
        });
        this.dataService.getGoal().subscribe((data) => {
          const goal = data.payload.data();
          console.log(goal);
          this.dataService.isGoalSet(Object.keys(goal).length !== 0);
        });
        this.dataService.profileFilled.subscribe(
          (data) => (this.profileFilled = data)
        );

        this.dataService.goalsSet.subscribe((data) => (this.goalsSet = data));
      }
    });
  }

  ngOnInit(): void {}
}
// if profileFilled and goalsSet -- redirect to '/today'
