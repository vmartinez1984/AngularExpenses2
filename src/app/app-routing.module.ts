import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { CreatePeriodComponent } from './periods/create-period/create-period.component';
import { DetailsPeriodComponent } from './periods/details-period/details-period.component';
import { ListPeriodsComponent } from './periods/list-periods/list-periods.component';
import { ListSubcategoriesComponent } from './subcategories/list-subcategories/list-subcategories.component';

const routes: Routes = [
  { path: 'categories', component: ListCategoriesComponent },
  { path: 'subcategories', component: ListSubcategoriesComponent},
  { path: 'periods', component: ListPeriodsComponent},
  { path: 'periods/create', component: CreatePeriodComponent},
  { path: 'periods/details/:id', component: DetailsPeriodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
