import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ITransaction } from '../../interfaces/ITransaction';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { VirementModalComponent } from '../resendOperation-modal/resendOperation-modal.component';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent implements OnInit {
  
  accountService = inject(AccountService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getFavoriteOperations();
  }

  constructor(){
    effect(() => {
      //once a transfer is added to favorite here i recall api
      this.accountService.handleChange() === true && this.getFavoriteOperations();
      // reset to value to false
      this.accountService.handleChange.set(false)
    },{ allowSignalWrites: true })
  }

  // selecting one favorite operation to show modal
  readonly dialog = inject(MatDialog);

  openDialog(operationId: number) {
    const dialogRef = this.dialog.open(VirementModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // setting operation id in Account service so i can get the operation in resendOperation Modal
    this.accountService.operationId.set(operationId-1);
  }  

  // Here i retreive all favorite operations
  favoriteOperations = signal<ITransaction[]>([]);

  getFavoriteOperations(){
    this.accountService.favoriteOperations().subscribe({
      next: (res) => {
        this.favoriteOperations.set(res);
      },
      error: () => this.toastr.error("Pas possible de charger les operations favorites !", "Operations favorites")
    })
  }

}
