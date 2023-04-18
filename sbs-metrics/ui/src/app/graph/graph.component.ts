import { Component } from '@angular/core';
import { ChartOptions, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  title = 'CFD ';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
  title2 = 'Business value versus Time Graph';

  public lineChartData2: ChartConfiguration<'line'>['data'] = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3'],
    datasets: [
      {
        data: [7, 6, 8],
        label: 'Business Value',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'blue',
      },
    ],
  };
  public lineChartOptions2: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend2 = true;
}
