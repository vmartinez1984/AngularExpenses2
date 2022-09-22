import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', { validator: [Validators.required] }]
    });
  }

  ngOnInit(): void {
  }

  add() {
    console.log(this.formGroup.value);
    this.categoryService.add(this.formGroup.value).subscribe(data => {
      alert("Datos registrados");
      this.router.navigateByUrl("categories");
    }, error => {
      alert("Valio pepino")
    });
    ;
  }
}
