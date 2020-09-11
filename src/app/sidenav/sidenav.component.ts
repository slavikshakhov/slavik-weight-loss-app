import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  constructor(public authService: AuthService) {
    this.authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
      console.log(authStatus);
    });
  }

  ngOnInit() {}

  onClose() {
    this.closeSidenav.emit();
  }
}
