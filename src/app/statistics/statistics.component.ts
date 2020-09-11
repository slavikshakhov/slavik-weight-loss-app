import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'weight',
    'burned',
    'burnedDueToBasalMetabolism',
    'gained',
    'resultInCals',
    'resultInGrams',
  ]
  records

  metrics
  //dataSource fetched from database
  dataSource

  constructor(private dataService: DataService) {
    this.dataService
      .getProfile()
      .subscribe((res) => (this.metrics = res.payload.data()))

    const table = []

    this.dataService.getRecords().subscribe((records) => {
      const recordsData = []
      records.forEach((record) => {
        recordsData.push(record.payload.doc.data())
      })
      console.log(recordsData)
      const recordsGroupedByDate = recordsData.reduce(
        (groups, el) => ({
          ...groups,
          [el.date]: [...(groups[el.date] || []), el],
        }),
        {},
      )
      console.log(recordsGroupedByDate)
      console.log(typeof recordsGroupedByDate)
      Object.keys(recordsGroupedByDate).map((k) => {
        const obj = {}
        let caloriesBurned = 0
        let caloriesGained = 0

        const arr = recordsGroupedByDate[k]
        arr.forEach((el) => {
          console.log(el)
          if (el.type === 'activity') {
            caloriesBurned += el.calories
          } else {
            caloriesGained += el.calories
          }
        })

        // if record is for today, calculate partial basal metabolism by this time,
        // for the rest of the dates, the total basal metabolism is used
        const isTodaysRecord = this.dataService.getToday() === k ? true : false
        console.log(isTodaysRecord)
        const basalMetabolism = isTodaysRecord
          ? this.getBasalMetabolismByNow(this.getBasalMetabolism(this.metrics))
          : this.getBasalMetabolism(this.metrics)
        const balanceInCalories =
          caloriesGained - caloriesBurned - basalMetabolism // -basal metabolism
        const balanceInGrams = balanceInCalories / 7.7
        const dateFormatted =
          k.slice(0, 4) + '/' + k.slice(4, 6) + '/' + k.slice(6)
        table.push({
          ...obj,
          date: dateFormatted,
          weight: this.metrics.weight,
          burned: caloriesBurned,
          burnedDueToBasalMetabolism: basalMetabolism,
          gained: caloriesGained,
          resultInCals: Math.round(balanceInCalories),
          resultInGrams: Math.round(balanceInGrams),
        })
      })
      console.log(table)
      this.dataSource = table
    })
  }

  ngOnInit(): void {}

  getBasalMetabolism(metrics) {
    const age = new Date().getFullYear() - metrics.birthdate.year
    console.log(age)
    let metabolicRate = 0
    if (metrics?.gender === 'male') {
      metabolicRate =
        88.362 +
        13.397 * this.metrics.weight +
        4.799 * this.metrics.height -
        5.677 * age
    } else if (metrics?.gender === 'female') {
      metabolicRate =
        447.593 + 9.247 * metrics.weight + 3.098 * metrics.height - 4.33 * age
    }
    return Math.round(metabolicRate)
  }
  getBasalMetabolismByNow(basalMetabolism) {
    const nowFromMidnight = new Date().getHours()
    return Math.round((basalMetabolism / 24) * nowFromMidnight)
  }
}
