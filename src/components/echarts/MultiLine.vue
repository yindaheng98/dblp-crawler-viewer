<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { provide } from 'vue';
import { getNodeLineData, getEdgeLineData } from '../../api'
import { asyncComputed } from '@vueuse/core'

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
]);

provide(THEME_KEY, "dark");

const props = defineProps<{ data: any }>();
const emit = defineEmits(['select'])

const option = asyncComputed(async () => {
    let data = [{ "name": "No data", "value": 1 }]
    if (typeof props.data === 'object') data = await getEdgeLineData(props.data.from, props.data.to)
    else data = await getNodeLineData(props.data)
    console.log(data)
    const end_date = new Date()
    const dates = []
    const packets = []
    const loss_rate = []
    let i = 0
    while (i < 24 * 60 * 0.2) { packets.push(0); loss_rate.push(0); i++ }
    while (i < 24 * 60 * 0.25) { packets.push(0.8 + 0.2 * (Math.random() - 0.5)); loss_rate.push(0.1 + 0.02 * (Math.random() - 0.5)); i++ }
    while (i < 24 * 60 * 0.45) { packets.push(0); loss_rate.push(0); i++ }
    while (i < 24 * 60 * 0.65) { packets.push(1 - 0.2 * (Math.random() - 0.5)); loss_rate.push(0.1 + 0.02 * (Math.random() - 0.5)); i++ }
    while (i < 24 * 60 * 0.70) { packets.push(0); loss_rate.push(0); i++ }
    while (i < 24 * 60 * 0.8) { packets.push(0.5 + 0.1 * (Math.random() - 0.5)); loss_rate.push(0.05 + 0.01 * (Math.random() - 0.5)); i++ }
    while (i < 24 * 60 * 0.9) { packets.push(0.7 + 0.1 * (Math.random() - 0.5)); loss_rate.push(0.07 + 0.01 * (Math.random() - 0.5)); i++ }
    while (i < 24 * 60 * 0.95) { packets.push(0.4 + 0.1 * (Math.random() - 0.5)); loss_rate.push(0.04 + 0.005 * (Math.random() - 0.5)); i++ }
    while (i <= 24 * 60) { packets.push(0.61 + 0.1 * (Math.random() - 0.5)); loss_rate.push(0.06 + 0.01 * (Math.random() - 0.5)); i++ }
    const bandwidth = []
    for (let i = 0; i <= 24 * 60; i++) {
        dates.push(end_date.getTime() - i * 1000 * 60)
        packets[i] = packets[i] * 10000
        bandwidth.push(packets[i] * 548 * (Math.random() * 0.3 + 0.7) / 1024 / 1024 * 8)
    }
    return {
        packets: {
            title: {
                show: true,
                text: "发包数量",
                x: 'center'
            },
            xAxis: {
                name: '时间',
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: (function (value) {
                        return new Date(parseInt(value)).toUTCString();
                    })
                },
                data: dates,
            },
            yAxis: {
                name: 'pkts'
            },
            series: [
                {
                    name: "CPU",
                    id: "A",
                    data: packets,
                    type: 'line',
                }
            ]
        },
        loss_rate: {
            title: {
                show: true,
                text: "丢包率",
                x: 'center'
            },
            xAxis: {
                name: '时间',
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: (function (value) {
                        return new Date(parseInt(value)).toUTCString();
                    })
                },
                data: dates,
            },
            yAxis: {
                name: '%'
            },
            series: [
                {
                    name: "CPU",
                    id: "A",
                    data: loss_rate,
                    type: 'line',
                }
            ]
        },bandwidth:{
            title: {
                show: true,
                text: "带宽占用",
                x: 'center'
            },
            xAxis: {
                name: '时间',
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    formatter: (function (value) {
                        return new Date(parseInt(value)).toUTCString();
                    })
                },
                data: dates,
            },
            yAxis: {
                name: 'Mbps'
            },
            series: [
                {
                    name: "CPU",
                    id: "A",
                    data: bandwidth,
                    type: 'line',
                }
            ]
        }
    }
})
</script>

<template>
    <VChart :option="option.packets" @click="(e) => emit('select', e.name, e.seriesId)" autoresize
        style="height: 33%; width: 100%" />
    <VChart :option="option.loss_rate" @click="(e) => emit('select', e.name, e.seriesId)" autoresize
        style="height: 33%; width: 100%" />
    <VChart :option="option.bandwidth" @click="(e) => emit('select', e.name, e.seriesId)" autoresize
        style="height: 33%; width: 100%" />
</template>
