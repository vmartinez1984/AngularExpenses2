import { Component, OnInit } from '@angular/core';
import { PeriodDto } from '../period';
import { PeriodService } from '../period.service';

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.css']
})
export class ListPeriodsComponent implements OnInit {
  listPeriods: PeriodDto[] = [];
  constructor(
    private periodService: PeriodService
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get() {
    this.periodService.get().subscribe(data => {
      console.log(data);
      this.listPeriods = data;
    })
  }
}
