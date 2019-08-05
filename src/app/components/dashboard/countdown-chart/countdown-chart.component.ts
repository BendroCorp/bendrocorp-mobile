import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { TimeSpan } from 'ng-timespan';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'event-countdown-chart',
  templateUrl: './countdown-chart.component.html',
  styleUrls: ['./countdown-chart.component.css']
})
export class CountdownChartComponent implements OnInit, AfterViewInit {
  @Input() endTime: string;

  // canvas
  @ViewChild('daysChart') public canvasDays: ElementRef;
  @ViewChild('hoursChart') public canvasHours: ElementRef;
  @ViewChild('minutesChart') public canvasMinutes: ElementRef;
  @ViewChild('secondsChart') public canvasSeconds: ElementRef;

  // labels
  eventDays: number;
  eventHours: number;
  eventMinutes: number;
  eventSeconds: number;

  // options
  chartOptions = { animation: { duration: 0 } };

  //
  eventStarted: boolean;

  ticker: Observable<number> = interval(500);

  constructor() { }

  updateDays(ts: TimeSpan) {
    const canvasEl: HTMLCanvasElement = this.canvasDays.nativeElement;
    const context = canvasEl.getContext('2d');

    const completeCircle = 30;
    const daMath = Math.round(completeCircle - ts.days);

    const pieOptions = {
      animation: false
    };
    const chartData = {
      datasets: [{
          data: [ts.days, daMath],
          backgroundColor: ['#2F2F2F', '#00476A']
      }]
    };

    const chartDays = new Chart(canvasEl, {
      type: 'doughnut',
      data: chartData,
      options: this.chartOptions
    });
    this.eventDays = Math.abs(ts.days);
  }

  updateHours(ts: TimeSpan) {
    const canvasEl: HTMLCanvasElement = this.canvasHours.nativeElement;
    const context = canvasEl.getContext('2d');

    const completeCircle = 24;
    const daMath = Math.round(completeCircle - ts.hours);

    const pieOptions = {
      animation: false
    };
    const chartData = {
      datasets: [{
          data: [ts.hours, daMath],
          backgroundColor: ['#2F2F2F', '#00476A']
      }]
    };
    const chartHours = new Chart(canvasEl, {
      type: 'doughnut',
      data: chartData,
      options: this.chartOptions
    });
    this.eventHours = Math.abs(ts.hours);
  }

  updateMinutes(ts: TimeSpan) {
    const canvasEl: HTMLCanvasElement = this.canvasMinutes.nativeElement;
    const context = canvasEl.getContext('2d');

    const completeCircle = 60;
    const daMath = Math.round(completeCircle - ts.minutes);

    const pieOptions = {
      animation: false
    };

    const chartData = {
      datasets: [{
          data: [ts.minutes, daMath],
          backgroundColor: ['#2F2F2F', '#00476A']
      }]
    };
    const chartHours = new Chart(canvasEl, {
      type: 'doughnut',
      data: chartData,
      options: this.chartOptions
    });
    this.eventMinutes = Math.abs(ts.minutes);
  }

  updateSeconds(ts: TimeSpan) {
    const canvasEl: HTMLCanvasElement = this.canvasSeconds.nativeElement;
    const context = canvasEl.getContext('2d');

    const completeCircle = 60;
    const daMath = Math.round(completeCircle - ts.seconds);

    const pieOptions = {
      animation: false
    };

    const chartData = {
      datasets: [{
          data: [ts.seconds, daMath],
          backgroundColor: ['#2F2F2F', '#00476A']
      }]
    };

    const chartHours = new Chart(canvasEl, {
      type: 'doughnut',
      data: chartData,
      options: this.chartOptions
    });
    this.eventSeconds = Math.abs(ts.seconds);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.endTime) {
      this.ticker.subscribe(
        () => {
          // for every tick update the chart

          const timespan = TimeSpan.Subtract(new Date().getTime(), new Date(this.endTime).getTime());
          this.updateDays(timespan);
          this.updateHours(timespan);
          this.updateMinutes(timespan);
          this.updateSeconds(timespan);
        }
      );
    } else {
      console.error('End time not passed to countdown widget. Countdown will not start.');
    }
  }

}
