import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { ListSubcategoriesComponent } from './subcategories/list-subcategories/list-subcategories.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ListPeriodsComponent } from './periods/list-periods/list-periods.component';
import { DetailsPeriodComponent } from './periods/details-period/details-period.component';
import { MenuComponent } from './templates/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCategoriesComponent,
    ListSubcategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ListPeriodsComponent,
    DetailsPeriodComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
