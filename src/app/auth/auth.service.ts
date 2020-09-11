import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;
  //userId = new Subject<string>();

  authChange = new Subject<boolean>();
  public isAuthenticated = false;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;

    //firebaseAuth.authState.subscribe((user) => (this.userId = user.uid));
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success!', value);
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.isAuthenticated = false;
        this.authChange.next(false);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Nice, it worked!');
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.isAuthenticated = false;
        this.authChange.next(false);
      });
  }

  logout() {
    this.firebaseAuth.signOut().then((res) => {
      this.isAuthenticated = false;
      this.authChange.next(false);
      /*
      this.router.navigateByUrl('/header', {
        skipLocationChange: true,
      });
      */
      this.router.navigate(['/login']);
    });
  }
}
