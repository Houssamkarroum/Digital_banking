import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'] // <- "styleUrls" instead of "styleUrl"
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage: string = '';
  searchFormGroup!: FormGroup;
  
  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers(): void {
    const keyword = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(keyword).pipe(
      catchError(err => {
        this.errorMessage = "An error occurred while fetching customers: " + err.message;
        return throwError(() => err);
      })
    );
  }

  handleDeleteCustomer(id: number): void {
    const confirmDelete = confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        // Remove the deleted customer from the list
        this.customers = this.customers.pipe(
          map(customers => customers.filter(c => c.id !== id))
        );
      },
      error: (err) => {
        console.error("Delete error:", err);
        alert("Could not delete customer. Reason: " + (err?.error?.message || err.message));
      }
    });
  }


  handleCustomerAccounts(c: Customer): void {
    // Navigate to the customer accounts page
    this.router.navigateByUrl("/admin/customer-accounts/"+c.id, { state: { customer: c } });
    console.log("Customer accounts for:", c);
  } 
}
