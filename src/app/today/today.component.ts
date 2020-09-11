import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

export interface DialogData {
  field: any;
  message: string;
}

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit {
  field: any;
  today =
    new Date().getFullYear() +
    '' +
    new Date().getMonth() +
    '' +
    new Date().getDate();

  constructor(private dataService: DataService) {
    this.dataService.getRecords().subscribe((records) => {
      console.log(records);
    });
  }

  ngOnInit(): void {}
}
