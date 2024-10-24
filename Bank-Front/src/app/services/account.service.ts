import { CustomerService } from './customer.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrentAccount } from '../interfaces/ICurrentAccount';
import { ISavingAccount } from '../interfaces/ISavingAccount';
import { IOperation } from '../interfaces/IOperation';
import { IVirement } from '../interfaces/IVirement';
import { ITransaction } from '../interfaces/ITransaction';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService{

    cin = localStorage.getItem('customerCin');
    accountId = localStorage.getItem('currentAccountId');

  //  console.log("ciiiinnnn"+ this?.cin);
    

  http = inject(HttpClient);
  customerService = inject(CustomerService);
  oauthService = inject(OAuthService);
  handleChange = signal<boolean>(false);
  router = inject(ActivatedRoute)

  BASE_URL = "http://localhost:8083";

  currentAccount = signal<ICurrentAccount | null>({
    balance: 0,
    decouvert: 0,
    account_id: '',
    created_at: new Date(),
    status: '',
    customer_id: null,
  });
  savingAccount = signal<ISavingAccount | null>({
    balance: 0,
    interestRate: 0,
    account_id: '',
    status: '',
    customer_id: null,
    created_at: null
  });

  getCurrentAccount(): Observable<ICurrentAccount> {
    return this.http.get<ICurrentAccount>(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/currentAccount/${this.cin}`,
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  getSavingAccount(): Observable<ISavingAccount> {
    return this.http.get<ISavingAccount>(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/savingAccount/${this.cin}`,
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  creditOperation(creditOperation: IOperation): Observable<any> {
    return this.http.put(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/credit`, creditOperation, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  debitOperation(debitOperation: IOperation): Observable<any> {
    return this.http.put(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/debit`, debitOperation,
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  transferOperation(transferOperation: IVirement): Observable<any> {
    return this.http.post(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/transfer`, transferOperation, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  transferToSavingOperation(transferOperation: IVirement): Observable<any> {
    return this.http.post(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/transferToSaving`, transferOperation, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  transferToCurrentOperation(transferOperation: IVirement): Observable<any> {
    return this.http.post(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/transferToCurrent`, transferOperation, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }
  // Getting all operations by account id retreived from localStorage
  operationsByAccountId(): Observable<ITransaction[]>{
    return this.http.get<ITransaction[]>(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/operations/${this.accountId}`, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }
  // Getting all favorites operations by ccount id retreived from localStorage
  favoriteOperations(): Observable<ITransaction[]>{
    return this.http.get<ITransaction[]>(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/operations/favorite/${this.accountId}`, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }
  operationId = signal<number>(0);

  oneFavoriteOperations(): Observable<ITransaction>{
    return this.http.get<ITransaction>(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/operations/onefavorite/${this.operationId()}`, 
    {
      headers: {
        "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
      }
    });
  }
}
