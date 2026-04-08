import { Routes } from '@angular/router';
import { Area } from './area/area';
import { Bar } from './bar/bar';
import { Bubble } from './bubble/bubble';
import { Candlestick } from './candlestick/candlestick';
import { Column } from './column/column';
import { Heatmap } from './heatmap/heatmap';
import { Line } from './line/line';
import { Mixed } from './mixed/mixed';
import { Timeline } from './timeline/timeline';
import { Boxplot } from './boxplot/boxplot';
import { Treemap } from './treemap/treemap';
import { Pie } from './pie/pie';
import { Radar } from './radar/radar';
import { Radialbar } from './radialbar/radialbar';
import { Scatter } from './scatter/scatter';
import { Polar } from './polar/polar';
import { Sparkline } from './sparkline/sparkline';
import { Funnel } from './funnel/funnel';
import { Range } from './range/range';
import { Slope } from './slope/slope';

export const APEXCHARTS_ROUTES: Routes = [
    {
        path: 'charts/apex/bar',
        component: Bar,
        data: { title: 'Apex Bar Chart' },
    },
    {
        path: 'charts/apex/area',
        component: Area,
        data: { title: 'Apex Area Chart' },
    },
    {
        path: 'charts/apex/bubble',
        component: Bubble,
        data: { title: 'Apex Bubble Chart' },
    },
    {
        path: 'charts/apex/candlestick',
        component: Candlestick,
        data: { title: 'Apex Candlestick Chart' },
    },
    {
        path: 'charts/apex/column',
        component: Column,
        data: { title: 'Apex Column Chart' },
    },
    {
        path: 'charts/apex/heatmap',
        component: Heatmap,
        data: { title: 'Apex Heatmap Chart' },
    },
    {
        path: 'charts/apex/line',
        component: Line,
        data: { title: 'Apex Line Chart' },
    },
    {
        path: 'charts/apex/mixed',
        component: Mixed,
        data: { title: 'Apex Mixed Chart' },
    },
    {
        path: 'charts/apex/timeline',
        component: Timeline,
        data: { title: 'Apex Timeline Chart' },
    },
    {
        path: 'charts/apex/boxplot',
        component: Boxplot,
        data: { title: 'Apex Boxplot Chart' },
    },
    {
        path: 'charts/apex/treemap',
        component: Treemap,
        data: { title: 'Apex Treemap Chart' },
    },
    {
        path: 'charts/apex/pie',
        component: Pie,
        data: { title: 'Apex Pie Chart' },
    },
    {
        path: 'charts/apex/radar',
        component: Radar,
        data: { title: 'Apex Radar Chart' },
    },
    {
        path: 'charts/apex/radialbar',
        component: Radialbar,
        data: { title: 'Apex Radialbar Chart' },
    },

    {
        path: 'charts/apex/scatter',
        component: Scatter,
        data: { title: 'Apex Scatter Chart' },
    },
    {
        path: 'charts/apex/polar-area',
        component: Polar,
        data: { title: 'Apex Polar Area Chart' },
    },
    {
        path: 'charts/apex/sparklines',
        component: Sparkline,
        data: { title: 'Apex Sparklines Chart' },
    },
    {
        path: 'charts/apex/range',
        component: Range,
        data: { title: 'Apex Range Chart' },
    },
    {
        path: 'charts/apex/funnel',
        component: Funnel,
        data: { title: 'Apex Funnel Chart' },
    },
    {
        path: 'charts/apex/slope',
        component: Slope,
        data: { title: 'Apex Slope Chart' },
    },
];
