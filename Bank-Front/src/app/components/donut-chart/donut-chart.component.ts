import { Component } from "@angular/core";
import { NgxEchartsDirective, provideEcharts} from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css',
})
export class DonutChartComponent {

  options: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Montant en DH',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'CREDIT' },
          { value: 735, name: 'DEBIT' }
        ]
      }
    ]
  };
 
}
