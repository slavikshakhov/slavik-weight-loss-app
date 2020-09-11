import { Component, OnInit, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenave-list.component.html',
  styleUrls: ['./sidenave-list.component.css'],
})
export class SidenaveListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>()

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.closeSidenav.emit()
  }
}
