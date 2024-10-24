import { formatDate } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  transactionName = input<string>();
  transactionType = input<string>();
  transactionAmount = input<number>();
  transactionDate = input<Date>();
static sumCreditOpt: any;

}
