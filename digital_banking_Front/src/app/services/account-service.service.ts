import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http:HttpClient) { }

  public getAccount(id: string, page : number, size : number): Observable<AccountDetails> {
      return this.http.get<AccountDetails>(environment.backendHost+'/accounts/'+id+"/pageOperations?page="+page+"&size="+size);
    }

  public debit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(environment.backendHost+'/accounts/debit', {
      accountId,
      amount,
      description
    }, { responseType: 'text' });
  }
  public credit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(environment.backendHost+'/accounts/credit', {
      accountId,
      amount,
      description
    }, { responseType: 'text' });
  }
  
  public transfer(accountId: string, accountDestination: string,description: string , amount: number): Observable<any> {
      return this.http.post(environment.backendHost+'/accounts/transfer', {
        accountSource: accountId,  // Changed from accountId to accountSource
        accountDestination,
        description,
        amount,
      }, { responseType: 'text' });
  }


}
