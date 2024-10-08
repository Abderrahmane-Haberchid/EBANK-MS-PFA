import { ITransaction } from './../../interfaces/ITransaction';
import { AccountService } from './../../services/account.service';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { FavorisComponent } from "../../components/favoris/favoris.component";
import { HeaderComponent } from '../../components/header/header.component';
import { BarsChartComponent } from "../../components/bars-chart/bars-chart.component";
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, TransactionComponent, FavorisComponent, HeaderComponent, BarsChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{

  router = inject(ActivatedRoute);
  customerService = inject(CustomerService);
  accountService = inject(AccountService);
  toastr = inject(ToastrService)

  accountId: string|null = '';

  ngOnInit(): void {
    this.accountId = localStorage.getItem("currentAccountId");
    this.getCurrentAccountByCin();
    this.getSavingAccountByCin();
    this.handleFilter();
    this.customerService.findUserByCIN(localStorage.getItem("customerCin")).subscribe({
      next: (res) => this.customerService.customer.set(res)
    });
    this.getOperationsByAccountId();
    
    this.getTotalCredit();
  }
  constructor(){
    effect(() => {
      this.handleFilter();
      this.accountService.handleChange() === true && this.getOperationsByAccountId();
      this.accountService.handleChange.set(false);
    }, { allowSignalWrites: true })
  }
  

  transactionList = signal<ITransaction[]>([]);


  entre = computed(() => {
      return this.transactionList().filter(val => val.type === "CREDIT")
  });
  sorti = computed(() => {
    return this.transactionList().filter(val => val.type === "DEBIT")
  });
  

filter = signal<string>('all')
filteredTransaction = signal<ITransaction[]>(this.transactionList())

handleFilter(){

  if(this.filter() === 'entre')
    this.filteredTransaction.set(this.entre())
  if(this.filter() === 'sorti')
    this.filteredTransaction.set(this.sorti())
  if(this.filter() === 'all')
    this.filteredTransaction.set(this.transactionList())
}

// Getting Current Account
getCurrentAccountByCin(){
  this.accountService.getCurrentAccount().subscribe({
    next: (res) => {
      this.accountService.currentAccount.set(res);
      localStorage.setItem("currentAccountId", res.account_id);
    },
    error: (err) => this.toastr.error("Erreur de connexion "+err.status, "Erreur")
  })
}

// Getting Saving Account
getSavingAccountByCin(){
  this.accountService.getSavingAccount().subscribe({
    next: (res) => {
        this.accountService.savingAccount.set(res);
        localStorage.setItem("savingAccountId", res.account_id);
    },
    error: (err) => this.accountService.savingAccount.set(null),
  })
}

// Getting operations by account id
getOperationsByAccountId(){
 
  this.accountService.operationsByAccountId(this.accountId).subscribe({
    next: (res) => {
      this.transactionList.set(res);
    },
    error: () => this.toastr.error("Pas possible de charger les opérations !", "Opérations")
  });
}
sum:number = 3;
getTotalCredit(){
  
  this.entre().map((e) => {
    this.sum += e.amount;
    console.log(this.sum);
    
    })
}

}
