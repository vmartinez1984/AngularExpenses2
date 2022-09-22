import { Component, OnInit } from '@angular/core';
import { SubcategoryDto } from '../subcategory';
import { SubcategoryService } from '../subcategory.service';

@Component({
  selector: 'app-list-subcategories',
  templateUrl: './list-subcategories.component.html',
  styleUrls: ['./list-subcategories.component.css']
})
export class ListSubcategoriesComponent implements OnInit {
  subcategories: SubcategoryDto[] = [];
  constructor(
    private subcategoriesService: SubcategoryService
  ) { 
    this.get()
  }

  ngOnInit(): void {
  }

  get() {
    this.subcategoriesService.get().subscribe(data => {
      this.subcategories = data;
      console.log(data);
    })
  }
}
