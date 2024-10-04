import { ITransaction } from '../../interfaces/ITransaction';
import { Component, computed, effect, signal, NgModule, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { TransactionComponent } from "../../components/transaction/transaction.component";
import { FormsModule } from '@angular/forms';
import { DonutChartComponent } from "../../components/donut-chart/donut-chart.component";
import { DoublebarsChartComponent } from "../../components/doublebars-chart/doublebars-chart.component";
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { IOperation } from '../../interfaces/IOperation';
import { IVirement } from '../../interfaces/IVirement';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, TransactionComponent, FormsModule, DonutChartComponent, DoublebarsChartComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit{

  accountService = inject(AccountService);
  customerService = inject(CustomerService);
  toastr = inject(ToastrService);

  constructor(){
    effect(() => {
      this.handleFilter();
    }, { allowSignalWrites: true })
  }
  ngOnInit(): void {
    this.getCurrentAccountByCin();
    this.getSavingAccountByCin();
    this.getOperationsByAccountId();
  }

  typeAccount: string = 'cheque';

  handleSelectedAccount(typeAccount: string){
    this.typeAccount = typeAccount;
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

    operation: IOperation = {
      accountId: '',
      amount: 0,
      description: '',
      accountType: ''
    }
    transfer: IVirement = {
      account_sender : '',
      account_receiver : '',
      amount: 0,
      description: '',
      favorite: false,
      libele: ''
    }

    handleFilter(){

      if(this.filter() === 'entre')
        this.filteredTransaction.set(this.entre())
      if(this.filter() === 'sorti')
        this.filteredTransaction.set(this.sorti())
      if(this.filter() === 'all')
        this.filteredTransaction.set(this.transactionList())
    }
    query = signal<string>('');

    handleSearch(){
        this.filteredTransaction.set(this.transactionList().filter(q => q.description.toLowerCase().includes(this.query().toLowerCase())))
    }

  // Getting Current Account
  getCurrentAccountByCin(){
    this.accountService.getCurrentAccount().subscribe({
      next: (res) => this.accountService.currentAccount.set(res),
      error: (err) => this.toastr.error("Erreur de connexion "+err.status, "Erreur")
    })
  }
  
  // Getting Saving Account
  getSavingAccountByCin(){
    this.accountService.getSavingAccount().subscribe({
      next: (res) => {
          this.accountService.savingAccount.set(res);
      },
      error: (err) => this.accountService.savingAccount.set(null),
    })
  }

  // Getting operations by account id
getOperationsByAccountId(){
 
  this.accountService.operationsByAccountId(localStorage.getItem("currentAccountId")).subscribe({
    next: (res) => {
      this.transactionList.set(res);
    },
    error: () => this.toastr.error("Pas possible de charger les opérations !", "Opérations")
  });
}

}
