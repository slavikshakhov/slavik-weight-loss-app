import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { DataService } from '../data.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css'],
})
export class WeightComponent implements OnInit {
  metrics
  weight

  constructor(private dataService: DataService, private router: Router) {
    this.dataService.getProfile().subscribe((res) => {
      this.metrics = res.payload.data()
      this.weight = res.payload.data()['weight']
    })
  }

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.metrics.weight = this.weight
    console.log(this.metrics)
    this.dataService.setMetrics(this.metrics)
    this.router.navigate([''])
  }
}
