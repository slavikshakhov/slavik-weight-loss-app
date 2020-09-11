import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AuthService } from './auth/auth.service';
import { DataService } from './data.service';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { GoalsComponent } from './goals/goals.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SidenaveListComponent } from './sidenave-list/sidenave-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyInfoComponent } from './body-info/body-info.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TodayComponent } from './today/today.component';
import { DialogComponent } from './helpers/dialog/dialog.component';
import { TodaySummeryComponent } from './today-summery/today-summery.component';
import { TodayFormComponent } from './today-form/today-form.component';
import { WeightComponent } from './weight/weight.component';
import { HowComponent } from './how/how.component';
import { ContactComponent } from './contact/contact.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    GoalsComponent,
    HomeComponent,
    HeaderComponent,
    SidenaveListComponent,
    SidenavComponent,
    BodyInfoComponent,
    StatisticsComponent,
    TodayComponent,
    DialogComponent,
    TodaySummeryComponent,
    TodayFormComponent,
    WeightComponent,
    HowComponent,
    ContactComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
  ],
  providers: [AngularFirestore, AuthService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
