
import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';
import { ITransaction } from '../../interfaces/ITransaction';
import { ToastrService } from 'ngx-toastr';
import { IVirement } from '../../interfaces/IVirement';

@Component({
  selector: 'app-virement-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './resendOperation-modal.component.html',
  styleUrl: './resendOperation-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirementModalComponent implements OnInit{
  ngOnInit(): void {
    this.getOneFavoriteOperation();
  }
 
  accountService = inject(AccountService);
  toastr = inject(ToastrService);

  favoriteOperation = signal<ITransaction>({
    operationId: 0,
    type: '',
    operationDate: new Date(),
    amount: 0,
    favorite: '',
    description: '',
    accountId: '',
    libele: ''
  })

  transfer: IVirement = {
    account_sender : '',
    account_receiver : '',
    amount: 0,
    description: '',
    favorite: false,
    libele: ''
  }
  
  getOneFavoriteOperation(){
    this.accountService.oneFavoriteOperations().subscribe({ 
      next: (res) => {
        this.favoriteOperation.set(res);
        // setting up tranfer object to pass it addTransferOperation method
        this.transfer.account_sender  = this.accountService.currentAccount()?.account_id;
        this.transfer.account_receiver  = this.favoriteOperation().accountId;
        this.transfer.amount = this.favoriteOperation().amount;
        this.transfer.description = this.favoriteOperation().description;
        this.transfer.favorite = false;
        this.transfer.libele = this.favoriteOperation()?.libele;
      } ,
      error: (err) => this.toastr.error("Une erreur s'est produite", "Erreur"),
    })
  }

    // Adding a transfer operation
    addTransferOperation(){
      this.accountService.transferOperation(this.transfer).subscribe({
        next: () => {
          this.toastr.success("Virement envoyé avec succes !", "Virement");
          this.getCurrentAccountByCin();
          this.accountService.handleChange.set(true);
        },
        error: () => this.toastr.error("Une erreur s'est produite ! Merci de réessayer", "Virement")
      })
    }

    getCurrentAccountByCin(){
      this.accountService.getCurrentAccount().subscribe({
        next: (res) => this.accountService.currentAccount.set(res),
        error: (err) => this.toastr.error("Erreur de connexion "+err.status, "Erreur")
      })
    }
}
