import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/categories/categories.service';
import { CategoryDto } from 'src/app/categories/category';
import { SubcategoryDto } from '../subcategory';
import { SubcategoryService } from '../subcategory.service';

@Component({
  selector: 'app-list-subcategories',
  templateUrl: './list-subcategories.component.html',
  styleUrls: ['./list-subcategories.component.css']
})
export class ListSubcategoriesComponent implements OnInit {
  subcategories: SubcategoryDto[] = []
  categories: CategoryDto[] = []
  formGroup: FormGroup
  total: number = 0
  orderNameAsc: boolean = true;
  orderCategoryNameAsc: boolean = true;
  orderAmountAsc: boolean = true;

  constructor(
    private subcategoryService: SubcategoryService,
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder
  ) {
    this.getCategories()
    this.getSubcategories()
    this.formGroup = this.formBuilder.group({
      id: [],
      name: [],
      categoryName: [],
      amount: []
    })
  }

  getCategories() {
    this.categoryService.get().subscribe(data => {
      this.categories = data
    })
  }

  ngOnInit(): void {
  }

  getSubcategories() {
    this.subcategoryService.getAll().subscribe(data => {
      this.subcategories = data;
      this.total = 0
      this.subcategories.forEach(item => {
        this.total += item.amount
      });
      //console.log(data);
    })
  }


  saveSubcategory() {
    console.log(this.formGroup.value)
    if (this.formGroup.value.id == null) {
      this.subcategoryService.add(this.formGroup.value).subscribe(data => {
        alert("Datos registrados")
        this.formGroup.reset()
        this.getSubcategories()
      })
    } else {
      this.subcategoryService.update(this.formGroup.value).subscribe(data => {
        alert("Datos registrados")
        this.formGroup.reset()
        this.getSubcategories()
      })
    }
  }

  deleteSubcategory(subcategory: SubcategoryDto) {
    if (confirm('¿Desea borrar ' + subcategory.name + '?')) {
      this.subcategoryService.delete(subcategory.id).subscribe(data => {
        this.getSubcategories()
      })
    }
  }

  editSubcategory(category: CategoryDto) {
    this.subcategoryService.getById(category.id).subscribe(data => {
      this.formGroup.patchValue(data)
    })
  }

  orderBy(prop: string) {
    //console.log('Ordenado')
    let asc = true;
    switch (prop) {
      case 'name':
        this.orderNameAsc = this.orderNameAsc == true ? false : true
        asc = this.orderNameAsc
        break
      case 'categoryName':
        this.orderCategoryNameAsc = this.orderCategoryNameAsc == true ? false : true
        asc = this.orderCategoryNameAsc
        break
      case 'amount':
        this.orderAmountAsc = this.orderAmountAsc == true ? false : true
        asc = this.orderAmountAsc
        break
    }
    this.sortJSON(this.subcategories, prop, asc)
  }

  sortJSON(data: any, key: string, asc: boolean) {
    return data.sort((a: any, b: any) => {
      var x = a[key],
        y = b[key];

      if (asc) {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

}