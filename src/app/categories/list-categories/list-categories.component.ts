import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private formBuilder : FormBuilder
  ) { 
    this.formGroup = this.formBuilder.group({
      id:[''],
      name:['']
    })
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
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
  
  save(){
    if(this.formGroup.value.id == null){
      this.categoriesService.add(this.formGroup.value).subscribe(data=>{
        this.getCategories()
        alert("Datos registrados")
        this.formGroup.reset()
      })
    }else{
      this.categoriesService.update(this.formGroup.value).subscribe(data=>{
        this.getCategories()
        alert("Datos registrados")
        this.formGroup.reset()
      })
    }
  }

  edit(category:CategoryDto){
    this.formGroup.patchValue(category)
  }
}
