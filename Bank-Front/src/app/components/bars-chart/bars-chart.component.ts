import { Component, inject, OnInit, signal } from '@angular/core';
import { NgxEchartsDirective} from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { AccountService } from '../../services/account.service';
import { ITransaction } from '../../interfaces/ITransaction';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bars-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './bars-chart.component.html',
  styleUrl: './bars-chart.component.css'
})
export class BarsChartComponent implements OnInit{

  transactionList = signal<ITransaction[]>([]);
  janvierList: ITransaction[] = [];
  sum: number = 0;
  date: Date = new Date();

  ngOnInit(): void {
    this.getOperationsByAccountId();
    this.janvierList = this.transactionList().filter((transaction) => {
      
      this.date.getMonth() === 9;
    });

    this.transactionList().map((t) => {
      console.log("acha wa hada" + t.amount);
    })
  }

  accountService = inject(AccountService);
  toastr = inject(ToastrService);

  options: EChartsOption = {
    color: ['#3B5999'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Montant',
        type: 'bar',
        barWidth: '40%',
        data: [this.sum, 12000, 9200, 9000, 4590, 3330, 7220, 2800, 8334, 4390, 3030, 7000],
      },
    ],
  };

   // Getting operations by account id
getOperationsByAccountId(){
  
  this.accountService.operationsByAccountId().subscribe({
    next: (res) => {
      this.transactionList.set(res);
      
      this.transactionList().map((t) => {
        this.date = new Date(t.operationDate)
        console.log(this.date.getFullYear());
        
      })
      
    },
    error: () => this.toastr.error("Pas possible de charger les opérations !", "Opérations")
  });
}
}
