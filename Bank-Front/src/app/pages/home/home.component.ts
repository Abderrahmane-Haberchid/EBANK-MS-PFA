import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpHeaders } from '@angular/common/http';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  header: HttpHeaders|undefined;
  oauthService = inject(OAuthService)
  customerService = inject(CustomerService);
  accountService = inject(AccountService);
  toastr = inject(ToastrService);

  constructor(private router: Router){}

  query: string = '';

  handleSearch(){
    this.customerService.findUserByCIN(this.query).subscribe({
      next: (res) => {
        this.customerService.customer.set(res);
        localStorage.setItem('customerCin', res.cin);
        localStorage.setItem('customerId', String(res.customerId));
      },
      error: (err) => {
        err !== 200 && this.toastr.error("Membre introuvable !", "Erreur");
        
      },
    });
  }

  logout(){
    this.oauthService.logOut();
  }

  redirectToDashboard(cin: any){
    this.router.navigate([`/dashboard/${cin}`]);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 5000);
  }


}