import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { CategoryDto } from '../category';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  listCategories: CategoryDto[] = [];
  formGroup: FormGroup;
  isFormDisabled: boolean = false
  isSaving: boolean = false

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoriesService.get().subscribe(data => {
      this.listCategories = data
      //console.log(this.listCategories)
    });
  }

  delete(category: CategoryDto) {
    if (confirm("¿Desea borrar la categoria " + category.name + "?")) {
      this.categoriesService.delete(category.id).subscribe(
        data => {
          alert("Datos borrados");
          this.getCategories()
        }, error => {
          alert("Valio pepino")
        })

    }
  }

  save() {
    console.log(this.formGroup.valid)
    console.log(this.formGroup.value)
    console.log(this.formGroup)
    if (this.formGroup.valid) {
      this.isFormDisabled = true
      this.isSaving = true      
      //this.formGroup.get('name')?.disable()     
      // if (this.formGroup.value.id == undefined) {               
      //   this.categoriesService.add(this.formGroup.value).subscribe(data => {
      //     this.getCategories()
      //     alert("Datos registrados")
      //     this.formGroup.reset()
      //   }, error => {
      //     console.log(error)
      //   })
      // } else {
      //   this.categoriesService.update(this.formGroup.value).subscribe(data => {
      //     this.getCategories()
      //     alert("Datos registrados")
      //     this.formGroup.reset()
      //   }, error => {
      //     console.log(error)
      //   })
      // }
    }
  }

  edit(category: CategoryDto) {
    this.formGroup.patchValue(category)
  }
}
