import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { PeriodService } from '../period.service';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.css']
})
export class CreatePeriodComponent implements OnInit {
  formGroup : FormGroup;
  pipe = new DatePipe('en-US');


  constructor(
    private service: PeriodService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.formGroup = this.formBuilder.group({
      name : [''],
      dateStart: [formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss', 'en'), [Validators.required]],
      dateEnd:[Date.now()]
    })
  }

  ngOnInit(): void {
  }

  save() {    
    //let dateStart = this.formGroup.get('dateStart')
    //this.formGroup.get('dateStart')?.setValue( this.pipe.transform(dateStart+'', 'dd/MM/yyy'))
    console.log(this.formGroup.value)    
    this.service.add(this.formGroup.value).subscribe(data => {
      alert("Datos registrados")
      this.router.navigateByUrl('/periods');
    }, error => {
      alert("Valio pepino" + error.mesage)
    })
  }
}
