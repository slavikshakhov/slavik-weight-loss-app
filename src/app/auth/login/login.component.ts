import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    console.log(form);
    this.email = form.value.email;
    this.password = form.value.password;
    this.authService.login(this.email, this.password);
    this.email = this.password = '';

    //this.checkIfProfileGoalsSet();
    if (localStorage.getItem('weight-loss-registered-user') !== 'registered') {
      localStorage.setItem('weight-loss-registered-user', 'registered');
    }
  }
  /*
  checkIfProfileGoalsSet() {
    if (typeof this.dataService.userId !== 'undefined') {
      console.log('from app, userId exists');
      this.dataService.getProfile().subscribe((res) => {
        const data = res.payload.data();
        console.log(data);
        this.dataService.isProfileFilled(Object.keys(data).length !== 0);
      });

      this.dataService.getGoal().subscribe((res) => {
        const goal = res.payload.data();
        this.dataService.isGoalSet(
          Object.keys(res.payload.data()).length !== 0
        );
      });
    }
  }
  */
}
