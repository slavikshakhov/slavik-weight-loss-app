import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { GoalsComponent } from './goals/goals.component';
import { TodayComponent } from './today/today.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AuthGuard } from './auth.guard';
import { WeightComponent } from './weight/weight.component';
import { HowComponent } from './how/how.component';
import { ContactComponent } from './contact/contact.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
  { path: 'today', component: TodayComponent, canActivate: [AuthGuard] },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'weight',
    component: WeightComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'how',
    component: HowComponent,
  },
  { path: 'contact', component: ContactComponent },
  { path: 'terms', component: TermsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
