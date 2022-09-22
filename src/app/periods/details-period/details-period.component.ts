import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/categories/categories.service';
import { CategoryDto } from 'src/app/categories/category';
import { SubcategoryDto } from 'src/app/subcategories/subcategory';
import { EntryDto } from '../entry';
import { EntryService } from '../entry.service';
import { ExpenseDto } from '../expense';
import { ExpensesService } from '../expenses.service';
import { PeriodDto } from '../period';
import { PeriodService } from '../period.service';

@Component({
  selector: 'app-details-period',
  templateUrl: './details-period.component.html',
  styleUrls: ['./details-period.component.css']
})
export class DetailsPeriodComponent implements OnInit {
  periodId: any
  period: PeriodDto = new PeriodDto('', '', 0, 0, 0, new Date(), new Date());
  expenses: ExpenseDto[]
  entries: EntryDto[]
  categories: CategoryDto[]
  subcategories: SubcategoryDto[]
  formExpense: FormGroup
  formEntry: FormGroup

  constructor(
    private periodService: PeriodService
    , private categoryService: CategoriesService
    , private expenseService: ExpensesService
    , private entryService: EntryService
    , private activatedRoute: ActivatedRoute
    , private formExpenseBuilder: FormBuilder
  ) {
    this.periodId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPeriod()
    this.getExpenses()
    this.getEntries()
    this.getCategories()
    this.formExpense = this.formExpenseBuilder.group({
      periodId: [this.periodId],
      category: ['', { validator: [Validators.required] }],
      subcategoryName: ['', { validator: [Validators.required] }],
      name: ['', { validator: [Validators.required] }],
      amount: ['', { validator: [Validators.required] }]
    })
    this.formEntry = this.formExpenseBuilder.group({
      periodId: [this.periodId],
      name: ['', { validator: [Validators.required] }],
      amount: ['', { validator: [Validators.required] }]
    })
  }

  getEntries(){
    this.periodService.getEntries(this.periodId).subscribe(data => {
      this.entries = data
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  getCategories() {
    this.categoryService.get().subscribe(data => {
      this.categories = data
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  getSubcategories() {
    console.log(this.formExpense.value.category)
    this.categoryService.getSubcategoriesByCategoryId(this.formExpense.value.category).subscribe(data => {
      this.subcategories = data
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  loadSubcategory() {
    let subcategory: any

    subcategory = this.subcategories.find(x => x.name == this.formExpense.value.subcategoryName)
    //console.log(subcategory)
    this.formExpense.get('name')?.setValue(subcategory.name);
    this.formExpense.get('amount')?.setValue(subcategory.amount);
  }

  getPeriod() {
    this.periodService.getById(this.periodId).subscribe(data => {
      this.period = data;
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  getExpenses() {
    this.periodService.getExpenses(this.periodId).subscribe(data => {
      this.expenses = data
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  addExpense() {
    console.log(this.formExpense.value)
    this.expenseService.add(this.formExpense.value).subscribe(data => {
      this.formExpense.reset({ periodId: this.periodId })
      this.getExpenses()
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  deleteExpense(expense: ExpenseDto) {
    if (confirm("¿Desea borrar el gasto " + expense.name + "?")){
      this.expenseService.delete(expense.id).subscribe(data => {        
        this.getExpenses()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    }
  }

  deleteEntry(entry:EntryDto){
    if (confirm("¿Desea borrar el ingreso " + entry.name + "?")){
      this.entryService.delete(entry.id).subscribe(data => {        
        this.getEntries()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    }
  }

  addEntry(){
    console.log(this.formEntry.value)
    this.entryService.add(this.formEntry.value).subscribe(data => {
      this.formEntry.reset({ periodId: this.periodId })
      this.getEntries()
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  ngOnInit(): void {
  }

}
