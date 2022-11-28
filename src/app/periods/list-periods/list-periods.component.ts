import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodDto } from '../period';
import { PeriodService } from '../period.service';

@Component({
  selector: 'app-list-periods',
  templateUrl: './list-periods.component.html',
  styleUrls: ['./list-periods.component.css']
})
export class ListPeriodsComponent implements OnInit {
  listPeriods: PeriodDto[] = []
  formGroup: FormGroup
  isSaving:boolean= false
  constructor(
    private periodService: PeriodService,
    private formBuilder: FormBuilder
  ) { 
    this.formGroup = this.formBuilder.group({
      id : [''],
      name : [''],
      dateStart: [[Validators.required]],
      dateEnd:[Date.now()]
    })
  }

  ngOnInit(): void {
    this.getPeriods()
  }

  getPeriods() {
    this.periodService.get().subscribe(data => {
      console.log(data);
      this.listPeriods = data;
    })
  }

  delete(period: PeriodDto) {
    if (confirm("¿Desea borrar el periodo " + period.name + "?")){
      this.periodService.delete(period.id).subscribe(data=>{
        this.getPeriods();
      }, error=>{
        console.log(error);
      })
    }
  }

  save(){
    this.isSaving = true
    this.formGroup.disable()
    console.log(this.formGroup.value)
    if(this.formGroup.value.id == null || this.formGroup.value.id == ""){
      this.periodService.add(this.formGroup.value).subscribe(data=>{
        this.getPeriods()
        this.formGroup.reset()
        this.formGroup.enable()
        this.isSaving = false
        //alert("Datos registrados")
      })
    }else{
      this.periodService.update(this.formGroup.value).subscribe(data=>{
        this.getPeriods()
        this.formGroup.reset()
        this.formGroup.enable()
        this.isSaving = false
        //alert("Datos registrados")
      })
    }
  }

  editPeriod(period: PeriodDto){
    this.formGroup.patchValue(period)
  }
}
