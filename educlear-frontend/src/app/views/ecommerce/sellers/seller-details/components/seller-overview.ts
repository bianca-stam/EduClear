import {Component} from '@angular/core';
import {ApexOptions} from 'ng-apexcharts';
import {Apexchart} from '@app/components/apexchart';
import {getColor} from '@/app/utils/color-utils';

@Component({
    selector: 'app-seller-overview',
    imports: [
        Apexchart
    ],
    template: `
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Seller Overview</h4>
            </div>

            <div class="card-body">

                <app-apexchart
                    [getOptions]="apexChartOptions"
                />

            </div>
        </div>
    `,
    styles: ``
})
export class SellerOverview {

    generateRandomData(count: number = 15, min: number = 5, max: number = 20): number[] {
        return Array.from({length: count}, () =>
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    chartOptions!: Partial<ApexOptions>;
    apexChartOptions:() => ApexOptions = () => ({
        series: [
            {
                name: "Orders",
                type: "area",
                data: this.generateRandomData(12, 40, 100),
            },
            {
                name: "Earnings",
                type: "bar",
                data: this.generateRandomData(12, 70, 150).map(x => parseFloat((x * 1.1).toFixed(2))),
            },
            {
                name: "Refunds",
                type: "line",
                data: this.generateRandomData(12, 3, 12),
            },
        ],
        chart: {
            height: 370,
            type: "line",
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: "straight",
            dashArray: [0, 0, 8],
            width: [2, 0, 2.2],
        },
        fill: {
            opacity: [0.1, 0.9, 1]
        },
        markers: {
            size: [0, 0, 0],
            strokeWidth: 2,
            hover: {
                size: 4,
            },
        },
        xaxis: {
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ],
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 10,
                left: 0,
            },
        },
        legend: {
            show: true,
            horizontalAlign: "center",
            offsetX: 0,
            offsetY: 5,
            itemMargin: {
                horizontal: 10,
                vertical: 0,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "30%",
                barHeight: "70%",
                borderRadius: 5
            },
        },
        colors: [getColor('secondary'), getColor('chart-primary'), getColor('warning')],
        tooltip: {
            shared: true,
            y: [
                {
                    formatter: (y: number): string => `${y.toFixed(0)} Sales`
                },
                {
                    formatter: (y: number): string => `$${y.toFixed(2)}k`
                },
                {
                    formatter: (y: number): string => `${y.toFixed(0)} Sales`
                }
            ]
        },
    })
}
