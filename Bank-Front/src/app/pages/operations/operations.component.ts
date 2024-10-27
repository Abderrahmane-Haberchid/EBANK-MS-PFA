import { RouterLinkActive } from '@angular/router';
import { AccountService } from './../../services/account.service';
import { CustomerService } from '../../services/customer.service';
import { Component, effect, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FavorisComponent } from "../../components/favoris/favoris.component";
import { HeaderComponent } from "../../components/header/header.component";


import {ChangeDetectionStrategy, inject} from '@angular/core';
import { VirementModalComponent } from '../../components/resendOperation-modal/resendOperation-modal.component';
import { IOperation } from '../../interfaces/IOperation';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IVirement } from '../../interfaces/IVirement';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [SidebarComponent, FavorisComponent, HeaderComponent, VirementModalComponent, FormsModule],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsComponent implements OnInit{

  ngOnInit(): void {
    this.getCurrentAccountByCin();
    this.getSavingAccountByCin();
  }

  constructor(){
  }

  accountService = inject(AccountService);
  customerService = inject(CustomerService);
  toastr = inject(ToastrService);

    selectedOpt: string = '';
    selectedAccount: string = 'cheque';
    handleChange = signal<boolean>(false);
   
    onSelected(value: string) {
      this.selectedOpt = value;
    }

    onSelectedAccount(account: string){
      this.selectedAccount = account;
    }
  addTofavorite = false;

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

  // Adding a credit operation
  addCreditOperation(){
    
    this.operation.accountType = 'CA';
    if(this.selectedAccount === 'cheque'){
      this.operation.accountId = this.accountService?.currentAccount()?.account_id;
      this.operation.accountType = 'CA';
    }
    if(this.selectedAccount === 'epargne'){
      this.operation.accountId = this.accountService?.savingAccount()?.account_id;
      this.operation.accountType = 'SA';
    }

    this.accountService.creditOperation(this.operation).subscribe({
      next: (res) => {
        this.toastr.success('Montant ajouté au compte', 'Versement');
        this.handleChange.set(true);
        this.getCurrentAccountByCin();
        this.getSavingAccountByCin();
      },
      error: (err) => this.toastr.error('Une erreur est produite', "Versement")
    })
  }
   // Adding a debit operation
   addDebitOperation(){
    
    this.operation.accountType = 'CA';
    if(this.selectedAccount === 'cheque'){
      this.operation.accountId = this.accountService?.currentAccount()?.account_id;
      this.operation.accountType = 'CA';
    }
    if(this.selectedAccount === 'epargne'){
      this.operation.accountId = this.accountService?.savingAccount()?.account_id;
      this.operation.accountType = 'SA';
    }

    this.accountService.debitOperation(this.operation).subscribe({
      next: (res) => {
        this.toastr.success('Retrait effectué', 'Retrait');
        this.getCurrentAccountByCin();
        this.getSavingAccountByCin();
      },
      error: (err) => this.toastr.error('Montant plus grand que la balance', "Retrait")
    })
  }

   // Adding a transfer operation
   addTransferOperation(){
    this.transfer.account_sender = this.accountService.currentAccount()?.account_id;
    this.transfer.favorite = this.addTofavorite;
    this.accountService.transferOperation(this.transfer).subscribe({
      next: () => {
        this.toastr.success("Virement envoyé avec succes !", "Virement");
        this.getCurrentAccountByCin();
        this.transfer.favorite === true && this.accountService.handleChange.set(true);
      },
      error: () => this.toastr.error("Une erreur s'est produite ! Merci de réessayer", "Virement")
    })
  }

  // Adding a transfer from CURRENT to SAVING account
  fromCurrentToSavingOperation(){
    this.transfer.account_sender = this.accountService.currentAccount()?.account_id;
    this.transfer.account_receiver = this.accountService.savingAccount()?.account_id;

    this.accountService.transferToSavingOperation(this.transfer).subscribe({
      next: () => {
        this.toastr.success("Montant ajouté au compte épargne !", "Succes");
        this.getCurrentAccountByCin();
        this.getSavingAccountByCin();
      },
      error: () => this.toastr.error("Une erreur s'est produite ! Merci de réessayer", "Erreur")
    })
  }

  // Adding a transfer from SAVING to CURRENT account
  fromSavingToCurrentOperation(){
    this.transfer.account_sender = this.accountService.savingAccount()?.account_id;
    this.transfer.account_receiver = this.accountService.currentAccount()?.account_id;
    //const savingBalance = this.accountService.savingAccount()?.balance;

    //if(savingBalance !== '' && savingBalance > this.transfer.amount){
      this.accountService.transferToCurrentOperation(this.transfer).subscribe({
        next: () => {
          this.toastr.success("Montant ajouté au compte courant !", "Succes");
          this.getCurrentAccountByCin();
        this.getSavingAccountByCin();
        },
        error: () =>  this.toastr.error("Une erreur s'est produite ! Merci de réessayer", "Erreur")
      })
    //}
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
}
