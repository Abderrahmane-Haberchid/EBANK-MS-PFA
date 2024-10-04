import { Component } from '@angular/core';
import { NgxEchartsDirective} from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-doublebars-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './doublebars-chart.component.html',
  styleUrl: './doublebars-chart.component.css'
})
export class DoublebarsChartComponent {

  options: EChartsOption = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', 'Reçu', 'Dépensé'],
        ['Janvier', 10000, 7000],
        ['Février', 11000, 12000],
        ['Mars', 12000, 3000],
        ['Avril', 7200, 5333],
        ['Mail', 10000, 1000],
        ['Juin', 9000, 12000],
        ['Juillet', 8999, 5399],
        ['Août', 7288, 5399],
        ['Septembre', 7024, 5309],
        ['Octobre', 7204, 5309],
        ['Novembre', 9724, 5309],
        ['Décembre', 8724, 2300],
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }]
  };

}
