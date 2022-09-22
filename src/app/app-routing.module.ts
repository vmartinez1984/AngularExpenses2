import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { DetailsPeriodComponent } from './periods/details-period/details-period.component';
import { ListPeriodsComponent } from './periods/list-periods/list-periods.component';
import { ListSubcategoriesComponent } from './subcategories/list-subcategories/list-subcategories.component';

const routes: Routes = [
  { path: 'categories', component: ListCategoriesComponent },
  { path: 'categories/create', component: CreateCategoryComponent },
  { path: 'categories/edit/:id', component: EditCategoryComponent },
  { path: 'subcategories', component: ListSubcategoriesComponent},
  { path: 'periods', component: ListPeriodsComponent},
  { path: 'periods/details/:id', component: DetailsPeriodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
