import { Component, OnInit } from '@angular/core';
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

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

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
}
