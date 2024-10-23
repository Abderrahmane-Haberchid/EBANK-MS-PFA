import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICustomer } from '../interfaces/ICustomer';
import { ICurrentAccount } from '../interfaces/ICurrentAccount';
import { ISavingAccount } from '../interfaces/ISavingAccount';
import { ICard } from '../interfaces/ICard';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public toastr: ToastrService,
    public httpClient: HttpClient,
    public router: Router,
    public oauthService: OAuthService
  ){}

  BASE_URL: string = "http://localhost:8083";

  customer = signal<ICustomer | null>({
    name: '',
    email: '',
    adresse: '',
    cin: '',
    customerId: null,
    created_at: null
  });

  creerCustomer(customer: ICustomer): Observable<any>{
   return this.httpClient.post(`${this.BASE_URL}/CUSTOMER-SERVICE/api/v1/customer/create`, customer, 
    {
      headers: {
        "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
      }
    })
  }

  creerCurrentAccount(currentAccount: ICurrentAccount): Observable<any>{
    return this.httpClient.post(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/currentAccount`, currentAccount, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }  

  creerSavingAccount(savingAccount: ISavingAccount): Observable<any>{
    return this.httpClient.post(`${this.BASE_URL}/ACCOUNT-SERVICE/api/v1/account/savingAccount`, savingAccount,
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  } 

  creerCard(card: ICard): Observable<ICard>{
    return this.httpClient.post<ICard>(`${this.BASE_URL}/CARD-SERVICE/api/v1/card/create`, card,
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  findUserByCIN(cin: string|null): Observable<ICustomer>{
    return this.httpClient.get<ICustomer>(`${this.BASE_URL}/CUSTOMER-SERVICE/api/v1/customer/${cin}`,
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }
}
