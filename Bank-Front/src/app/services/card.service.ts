import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from '../interfaces/ICard';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  http = inject(HttpClient);
  oauthService = inject(OAuthService);

  BASE_URL = "http://localhost:8083";
  customerId = localStorage.getItem("customerId");

  card = signal<ICard>({
    isEnabled: false,
    onlinePayment: false,
    internationalPayment: false,
    bypasse: false,
    createdAt: null,
    expirationDate: null,
    customerId: null
  })



  getCard(): Observable<ICard>{
    return this.http.get<ICard>(`${this.BASE_URL}/CARD-SERVICE/api/v1/card/${this.customerId}`, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  setEnabled(card: any): Observable<any>{
    return this.http.put<any>(`${this.BASE_URL}/CARD-SERVICE/api/v1/card/setEnabled`, card, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  setOnlinePayment(card: any): Observable<any>{
    return this.http.put<any>(`${this.BASE_URL}/CARD-SERVICE/api/v1/card/setOnlinePayment`, card, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  setByPass(card: any): Observable<any>{
    return this.http.put<any>(`${this.BASE_URL}/CARD-SERVICE/api/v1/card/setByPass`, card, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }

  setInternationalPayment(card: any): Observable<any>{
    return this.http.put<any>(`${this.BASE_URL}/CARD-SERVICE/api/v1/card/setInternationalPayment`, card, 
      {
        headers: {
          "Authorization": `Bearer ${this.oauthService.getAccessToken()}`
        }
      }
    );
  }
}
