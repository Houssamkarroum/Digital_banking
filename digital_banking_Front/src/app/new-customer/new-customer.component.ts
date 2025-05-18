import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  standalone: false,
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit {
  constructor(private fb : FormBuilder,private customerService : CustomerService,private router:Router) { }
  newCustomerFormGroup!: FormGroup;
customers!: Observable<Customer>;
  errorMessage!: String;

  ngOnInit(): void {
    this.newCustomerFormGroup = new FormGroup({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(null,[Validators.required, Validators.email])
      });
  }

  // Add methods to handle form submission and other logic
handleAddCustomer(){
  
   let customer:Customer = this.newCustomerFormGroup.value;
  // Add logic to send the data to the backend or perform any other actions
   console.log(customer);
  this.customerService.saveCustomer(customer).pipe(
    catchError(err => {
      this.errorMessage=err.message;
      return throwError(err);
    })
  ).subscribe({
    next: (data) => {
      alert("Customer added successfully");
      this.router.navigateByUrl("/customers");
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
