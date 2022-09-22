import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  id: any;
  formGroup: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: CategoriesService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', { validator: [Validators.required] }]
    });
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.service.getById(this.id).subscribe(data => {
      //console.log(data);
      this.formGroup.setValue({ name: data.name })
    })
  }

  ngOnInit(): void {
  }

  save() {
    this.service.update(this.id, this.formGroup.value).subscribe(
      data => {
        alert("Datos registrados");
        this.router.navigateByUrl("categories");
      }, error => {
        alert("Valio pepino")
      })
  }
}
