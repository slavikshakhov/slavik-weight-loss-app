import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form);
    this.email = form.value.email;
    this.password = form.value.password;
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
    this.profileAndGoalsNotSet();
    localStorage.setItem('weight-loss-registered-user', 'registered');
  }
  profileAndGoalsNotSet() {
    this.dataService.isProfileFilled(false);
    this.dataService.isGoalSet(false);
  }
}
