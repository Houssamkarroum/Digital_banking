import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountServiceService } from '../services/account-service.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})

export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;
  accountObservable!: Observable<AccountDetails>;
  lastSearchedId: string = '';
  operationFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private accountService: AccountServiceService) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    this.operationFormGroup = this.fb.group({
      amount: this.fb.control(''),
      operationType: this.fb.control('') ,
      description: this.fb.control(''),
      accountDestination: this.fb.control(null)
    });
  }

  handleSearchAccounts() {
    const id: string = this.accountFormGroup.value.accountId;
    this.lastSearchedId = id;
    this.currentPage = 0;
    this.accountObservable = this.accountService.getAccount(id, this.currentPage, this.pageSize);
  }

  changePage(page: number) {
    if (page < 0) return;
    this.currentPage = page;
    this.accountObservable = this.accountService.getAccount(this.lastSearchedId, this.currentPage, this.pageSize);
  }

   // ...existing code...
  handleOperation() {
      const { amount, operationType, description, accountDestination } = this.operationFormGroup.value;
      const accountId = this.accountFormGroup.value.accountId;
  
      let operation$!: Observable<any>;
  
      switch (operationType) {
        case 'DEBIT':
          operation$ = this.accountService.debit(accountId, amount, description);
          break;
        case 'CREDIT':
          operation$ = this.accountService.credit(accountId, amount, description);
          break;
        case 'TRANSFER':
          if (!accountDestination) {
            this.errorMessage = 'Destination account is required for transfer';
            return;
          }
          operation$ = this.accountService.transfer(accountId, accountDestination,description , amount );
          break;
        default:
          this.errorMessage = 'Invalid operation type';
          return;
      }
  
      operation$.subscribe({
        next: () => {
          this.handleSearchAccounts();
          this.operationFormGroup.reset();
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
  }
}
