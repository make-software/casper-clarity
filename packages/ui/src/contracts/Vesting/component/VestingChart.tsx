import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { VestingDetail } from '../container/VestingContainer';

interface Props {
  vestingDetail: VestingDetail;
}

class VestingChart extends Component<Props, {}> {
  render() {
    return <Line data={this.chartData()} options={this.chartOptions()} />;
  }

  chartData() {
    return {
      datasets: [
        this.fromBaseDataset({
          data: this.props.vestingDetail.getSchedulePoints()
        })
      ]
    };
  }

  chartOptions() {
    return {
      legend: { display: false },
      title: {
        display: true,
        text: 'Vesting Schedule',
        position: 'top',
        fontSize: 16
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              parser: 'MM/DD/YYYY HH:mm',
              tooltipFormat: 'll HH:mm'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'CLX'
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
  }

  fromBaseDataset(opts: any) {
    return {
      lineTension: 0.1,
      backgroundColor: 'rgba(92,182,228,0.4)',
      borderColor: 'rgba(92,182,228,1)',
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(92,182,228,1)',
      pointBackgroundColor: 'rgba(92,182,228,1)',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(92,182,228,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      ...opts
    };
  }
}

export default VestingChart;
