import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/categories/categories.service';
import { SubcategoryService } from 'src/app/subcategories/subcategory.service';
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
    , private subcategoryService: SubcategoryService
    , private activatedRoute: ActivatedRoute
    , private formExpenseBuilder: FormBuilder
  ) {
    this.periodId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPeriod()
    this.getExpenses()
    this.getEntries()
    this.getCategories()
    this.formExpense = this.formExpenseBuilder.group({
      id: '',
      periodId: [this.periodId],
      category: ['', { validator: [Validators.required] }],
      subcategoryName: ['', { validator: [Validators.required] }],
      name: ['', { validator: [Validators.required] }],
      amount: ['', { validator: [Validators.required] }]
    })
    this.formEntry = this.formExpenseBuilder.group({
      id: '',
      periodId: [this.periodId],
      name: ['', { validator: [Validators.required] }],
      amount: ['', { validator: [Validators.required] }]
    })
  }

  getEntries() {
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
    this.formExpense.get('subcategoryName')?.setValue("")
    if (this.formExpense.value.category != "") {
      this.categoryService.getSubcategoriesByCategoryId(this.formExpense.value.category).subscribe(data => {
        this.subcategories = data
      }, error => {
        alert('Valio pepino: ' + error)
      })
    }
  }

  loadSubcategory() {
    let subcategory: any

    subcategory = this.subcategories.find(x => x.name == this.formExpense.value.subcategoryName)
    //console.log(subcategory)    
    if (subcategory == undefined) {
      this.formExpense.get('name')?.setValue("");
      this.formExpense.get('amount')?.setValue("");
    } else {
      this.formExpense.get('name')?.setValue(subcategory.name);
      this.formExpense.get('amount')?.setValue(subcategory.amount);
    }
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
      let total = 0;
      this.expenses.forEach(item => {
        total = item.amount + total
      })
      this.period.totalExpenses = total
    }, error => {
      alert('Valio pepino: ' + error)
    })
  }

  addExpense() {
    this.formExpense.patchValue({ periodId: this.periodId })
    //console.log(this.formExpense.value)
    if (this.formExpense.value.id == null || this.formExpense.value.id == '') {
      this.expenseService.add(this.formExpense.value).subscribe(data => {
        alert("Datos registrados")
        this.formExpense.reset()
        this.formExpense.get('category')?.setValue("")
        this.formExpense.get('subcategoryName')?.setValue("")
        this.formExpense.get('periodId')?.setValue(this.periodId)
        this.getExpenses()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    } else {
      this.expenseService.update(this.formExpense.value).subscribe(data => {
        alert("Datos registrados")
        this.formExpense.reset()
        this.formExpense.get('category')?.setValue("")
        this.formExpense.get('subcategoryName')?.setValue("")
        this.formExpense.get('periodId')?.setValue(this.periodId)
        this.getExpenses()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    }
  }

  deleteExpense(expense: ExpenseDto) {
    if (confirm("¿Desea borrar el gasto " + expense.name + "?")) {
      this.expenseService.delete(expense.id).subscribe(data => {
        this.getExpenses()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    }
  }

  deleteEntry(entry: EntryDto) {
    if (confirm("¿Desea borrar el ingreso " + entry.name + "?")) {
      this.entryService.delete(entry.id).subscribe(data => {
        this.getEntries()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    }
  }

  addEntry() {
    this.formEntry.get('periodId')?.setValue(this.periodId)
    console.log(this.formEntry.value)
    if (this.formEntry.value.id == null || this.formEntry.value.id == '') {
      this.entryService.add(this.formEntry.value).subscribe(data => {
        this.formEntry.reset({ periodId: this.periodId })
        this.getEntries()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    } else {
      this.entryService.update(this.formEntry.value).subscribe(data => {
        this.formEntry.reset({ periodId: this.periodId })
        this.getEntries()
      }, error => {
        alert('Valio pepino: ' + error)
      })
    }
  }

  editExpense(expense: ExpenseDto) {
    //expense.periodId = this.periodId
    //console.log(expense)
    this.expenseService.get(expense.id).subscribe(dataExpense => {
      //console.log(dataExpense);
      let subcategoryName = dataExpense.subcategoryName
      //console.log(subcategoryName)
      this.subcategoryService.getAll().subscribe(data => {
        //console.log(data)              
        var subcategory = data.find((x: { name: any; }) => x.name == subcategoryName)
        //console.log(subcategory)
        var category = this.categories.find(x => x.name == subcategory.categoryName)
        dataExpense.category = category?.id;
        this.categoryService.getSubcategoriesByCategoryId(dataExpense.category).subscribe(data => {
          this.subcategories = data
          //console.log(dataEntry)
          this.formExpense.patchValue(dataExpense)
          console.log(this.formExpense.value)
        })
      })
    })
  }

  editEntry(entry: EntryDto) {
    entry.periodId = this.periodId
    //console.log(entry)
    this.formEntry.patchValue(entry)
  }

  sortJSON(data: any, key: string, orden: string): any {
    return data.sort(function (a: any, b: any) {
      var x = a[key],
        y = b[key];

      if (orden === 'asc') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  sortNameDirection: string = 'desc'
  sort(key: string) {
    this.sortJSON(this.expenses, key, this.sortNameDirection)
    this.sortNameDirection = this.sortNameDirection == 'asc' ? 'desc' : 'asc'
  }

  sortExpensesNameDirection: string = 'desc'
  sortExpensesSubcategoryNameDirection: string = 'desc'
  sortExpensesAmountDirection: string = 'desc'
  sortExpenses(key: string) {
    //console.log(key)
    let direction = 'desc'
    switch (key) {
      case 'name':
        this.sortExpensesNameDirection = this.sortExpensesNameDirection == 'asc' ? 'desc' : 'asc'
        direction = this.sortExpensesNameDirection
        break;
      case 'subcategoryName':
        this.sortExpensesSubcategoryNameDirection = this.sortExpensesSubcategoryNameDirection == 'asc' ? 'desc' : 'asc'
        direction = this.sortExpensesSubcategoryNameDirection
        break;
      case 'amount':
        this.sortExpensesAmountDirection = this.sortExpensesAmountDirection == 'asc' ? 'desc' : 'asc'
        direction = this.sortExpensesAmountDirection
        break;
      default:
        break;
    }
    //console.log(this.sortExpensesAmountDirection)  
    this.expenses = this.sortJSON(this.expenses, key, direction)
    //console.log(this.expenses)
  }
  ngOnInit(): void {
  }

}
